"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FormDescription,
  FormTitle,
  useFormContext,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FormPreviewPage() {
  // const { id: formId } = await params;
  // const { template } = await searchParams;

  const form = useFormContext();

  const watchedValues = form.watch();
  console.log("Form Values:", watchedValues);

  return (
    <Card>
      <CardHeader className="w-full max-w-lg mx-auto">
        <FormTitle className="large">{watchedValues.formLabel}</FormTitle>
        <FormDescription>{watchedValues.formDescription}</FormDescription>
      </CardHeader>
      <CardContent className="w-full max-w-lg mx-auto space-y-4">
        {watchedValues.questions?.map((question, index) => {
          console.log("Question:", question);
          return <FormField key={index} question={question} />;
        })}
      </CardContent>
    </Card>
  );
}

const FormField = ({ question }) => {
  return (
    <Field name={question.label}>
      {({ field, fieldState, accessibility }) => {
        const { onChange, onBlur, ...rest } = field;
        const elementsMap = {
          short_answer: (
            <Input
              {...field}
              {...accessibility}
              placeholder={question?.placeholder}
              disabled={fieldState.isSubmitting}
            />
          ),

          paragraph: (
            <Textarea
              {...field}
              {...accessibility}
              placeholder={question?.placeholder}
              disabled={fieldState.isSubmitting}
            />
          ),

          checkbox: (
            <div className="grid gap-2">
              {question?.options?.map(({ label }) => (
                <div key={label} className="flex items-center space-x-2">
                  <Checkbox
                    {...rest}
                    checked={field.value?.includes(label)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? onChange([...field.value, label])
                        : onChange(
                            field.value?.filter((item) => item !== label)
                          );
                    }}
                    disabled={fieldState.isSubmitting}
                    {...accessibility}
                  />
                  <FieldLabel>{label}</FieldLabel>
                </div>
              ))}
            </div>
          ),
          multiple_choice: (
            <RadioGroup
              {...rest}
              onValueChange={onChange}
              disabled={fieldState.isSubmitting}
              className="grid gap-2"
            >
              {question?.options?.map(({ label }) => (
                <div key={label} className="flex items-center space-x-2">
                  <RadioGroupItem value={label} {...accessibility} />
                  <FieldLabel>{label}</FieldLabel>
                </div>
              ))}
            </RadioGroup>
          ),
          dropdown: (
            <Select
              {...rest}
              onValueChange={onChange}
              onOpenChange={(open) => {
                if (!open) onBlur();
              }}
              disabled={fieldState.isSubmitting}
            >
              <SelectTrigger {...accessibility} className="w-full min-w-4">
                <SelectValue
                  placeholder={
                    <span className="truncate">
                      {question?.placeholder || "Select an option"}
                    </span>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {question?.options?.map((opt) => (
                  <SelectItem key={opt.label} value={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        };

        return (
          <Card>
            <CardHeader>
              <FieldLabel className="medium">{question?.label}</FieldLabel>
              <FieldDescription className="text-muted-foreground">
                {question?.description}
              </FieldDescription>
            </CardHeader>
            <CardContent>{elementsMap[question.type]}</CardContent>
            <CardFooter>
              <FieldError className="small" />
            </CardFooter>
          </Card>
        );
      }}
    </Field>
  );
};
