"use client";

import { cn } from "@/lib/utils/tailwind";
import * as React from "react";
import { useController } from "react-hook-form";
import { Label } from "../label";
import {
  type Field,
  FieldContextValue,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldProps,
} from "./field.types";
import { useFormContext } from "./form";

const FieldContext = React.createContext<FieldContextValue>(
  {} as FieldContextValue
);

const Field: Field = ({ className, children, ...props }: FieldProps) => {
  const { formName } = useFormContext();

  const controllerState = useController({
    defaultValue: props.defaultValue ?? "",
    ...props,
  });
  const {
    field: { name: fieldName },
    fieldState: { error },
  } = controllerState;

  const fieldId = `${formName}-${fieldName}`;
  const fieldLabelId = `${fieldId}-label`;
  const fieldDescriptionId = `${fieldId}-description`;
  const fieldErrorId = `${fieldId}-error`;

  const contextValue: FieldContextValue = React.useMemo(
    () => ({
      ...controllerState,
      ids: {
        fieldId,
        fieldLabelId,
        fieldDescriptionId,
        fieldErrorId,
      },
      accessibility: {
        id: fieldId,
        "aria-labelledby": fieldLabelId,
        "aria-describedby": !error
          ? fieldDescriptionId
          : `${fieldDescriptionId} ${fieldErrorId}`,
        "aria-invalid": !!error,
      },
    }),
    [
      controllerState,
      fieldId,
      fieldLabelId,
      fieldDescriptionId,
      fieldErrorId,
      error,
    ]
  );

  return (
    <FieldContext.Provider value={contextValue as FieldContextValue}>
      <div data-slot="form-field" className={cn("grid gap-2", className)}>
        {typeof children === "function" ? children(contextValue) : children}
      </div>
    </FieldContext.Provider>
  );
};

const useFieldContext = () => {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error("useFieldContext must be used within a Field");
  }
  return context;
};

function FieldLabel({ className, ...props }: FieldLabelProps) {
  const {
    ids: { fieldId, fieldLabelId },
    fieldState: { error },
  } = useFieldContext();
  return (
    <Label
      id={fieldLabelId}
      htmlFor={fieldId}
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  const {
    ids: { fieldDescriptionId },
  } = useFieldContext();
  return (
    <p
      data-slot="form-description"
      id={fieldDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldErrorProps) {
  const {
    fieldState: { error },
    ids: { fieldErrorId },
  } = useFieldContext();

  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="field-error"
      id={fieldErrorId}
      className={cn("text-destructive text-sm", className)}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      {body}
    </p>
  );
}

export { Field, FieldDescription, FieldError, FieldLabel, useFieldContext };
