import * as React from "react";
import { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";

export type FormContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues
> = UseFormReturn<TFieldValues, TContext, TTransformedValues> & {
  formName: string;
};

export type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues
> = Omit<React.ComponentProps<"form">, "onSubmit" | "children"> & {
  options?: UseFormProps<TFieldValues, TContext, TTransformedValues>;
  onSubmit: (data: TTransformedValues) => void;
  children?:
    | React.ReactNode
    | ((form: UseFormReturn<TFieldValues>) => React.ReactNode);
};

export type Form = (props: FormProps) => React.JSX.Element;

export type FormTitleProps = React.ComponentProps<"h2">;

export type FormDescriptionProps = React.ComponentProps<"p">;

export type FormErrorProps = React.ComponentProps<"p">;
