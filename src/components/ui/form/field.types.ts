import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
} from "react-hook-form";

export type FieldProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
  TTransformedValues = T
> = Omit<React.ComponentProps<"div">, "children"> &
  UseControllerProps<T, TName, TTransformedValues> & {
    children?:
      | React.ReactNode
      | ((context: FieldContextValue<T>) => React.ReactNode);
  };

export type FieldIds = {
  fieldId: string;
  fieldLabelId: string;
  fieldDescriptionId: string;
  fieldErrorId: string;
};

export type FieldAccessibility = {
  id: string;
  "aria-labelledby": string;
  "aria-describedby": string;
  "aria-invalid": boolean;
};

export type FieldContextValue<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> = UseControllerReturn<T, TName> & {
  ids: FieldIds;
  accessibility: FieldAccessibility;
};

export type Field = (props: FieldProps) => React.JSX.Element;

export type FieldArrayProps = UseFieldArrayProps & {
  children?:
    | React.ReactNode
    | ((fieldArray: UseFieldArrayReturn) => React.ReactNode);
};
export type FieldArray = (props: FieldArrayProps) => React.JSX.Element;

export type FieldLabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

export type FieldDescriptionProps = React.ComponentProps<"p">;

export type FieldErrorProps = React.ComponentProps<"p"> & {
  children?: React.ReactNode | ((error: FieldError) => React.ReactNode);
};
