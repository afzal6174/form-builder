"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  FormDescription,
  FormTitle,
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

const handleSubmit = (data) => console.log("Submitted data: ", data);

const DemoForm = () => {
  return (
    <Form
      name="form-1"
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-muted/50 p-6 rounded-lg my-4 shadow-lg"
    >
      {(form) => (
        <>
          <FormTitle className="large text-center">Test Form</FormTitle>
          <FormDescription className="text-muted-foreground">
            This is a test form description.
          </FormDescription>
          <Field
            name="field-1"
            rules={{
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            }}
          >
            {({ field, fieldState, accessibility }) => (
              <>
                <FieldLabel className="medium">Write something</FieldLabel>
                <FieldDescription className="text-muted-foreground">
                  This is a field description.
                </FieldDescription>
                <Input
                  {...field}
                  {...accessibility}
                  disabled={fieldState.isSubmitting}
                  placeholder="Type here..."
                />
                <FieldError className="small" />
              </>
            )}
          </Field>

          <Field
            name="field-2"
            rules={{
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            }}
          >
            {({ field, fieldState, accessibility }) => (
              <>
                <FieldLabel className="medium">Write something</FieldLabel>
                <FieldDescription className="text-muted-foreground">
                  This is a field description.
                </FieldDescription>
                <Textarea
                  {...field}
                  {...accessibility}
                  disabled={fieldState.isSubmitting}
                  placeholder="Type here..."
                />
                <FieldError className="small" />
              </>
            )}
          </Field>

          <Field
            name="field-3"
            rules={{
              required: "This field is required",
            }}
          >
            {({ field, fieldState, accessibility }) => {
              const { onChange, onBlur, ...rest } = field;
              return (
                <>
                  <FieldLabel className="medium">Select something</FieldLabel>
                  <FieldDescription className="text-muted-foreground">
                    This is a field description.
                  </FieldDescription>
                  <Select
                    {...rest}
                    onValueChange={onChange}
                    onOpenChange={(open) => {
                      if (!open) onBlur();
                    }}
                    disabled={fieldState.isSubmitting}
                  >
                    <SelectTrigger
                      {...accessibility}
                      className="w-full min-w-4"
                    >
                      <SelectValue
                        placeholder={
                          <span className="truncate">
                            Select a verified email to display
                          </span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError className="small" />
                </>
              );
            }}
          </Field>

          <Field
            name="gender"
            rules={{
              required: "This field is required",
            }}
          >
            {({ field, fieldState, accessibility }) => {
              const { onChange, onBlur, ...rest } = field;
              return (
                <>
                  <FieldLabel className="medium">Select your gender</FieldLabel>
                  <FieldDescription className="text-muted-foreground">
                    This is a field description.
                  </FieldDescription>
                  <RadioGroup
                    {...rest}
                    onValueChange={onChange}
                    disabled={fieldState.isSubmitting}
                    className="grid grid-cols-2 gap-2"
                  >
                    {[
                      { id: "male", label: "Male" },
                      { id: "female", label: "Female" },
                    ].map(({ id, label }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <RadioGroupItem value={id} {...accessibility} />
                        <FieldLabel>{label}</FieldLabel>
                      </div>
                    ))}
                  </RadioGroup>
                  <FieldError className="small" />
                </>
              );
            }}
          </Field>

          <Field
            name="checkbox-group"
            rules={{
              required: "This field is required",
            }}
          >
            {({ field, fieldState, accessibility }) => {
              const { onChange, onBlur, ...rest } = field;
              return (
                <>
                  <FieldLabel className="medium">Sidebar</FieldLabel>
                  <FieldDescription className="text-muted-foreground">
                    Select the items you want to display in the sidebar.
                  </FieldDescription>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        id: "recents",
                        label: "Recents",
                      },
                      {
                        id: "home",
                        label: "Home",
                      },
                      {
                        id: "applications",
                        label: "Applications",
                      },
                      {
                        id: "desktop",
                        label: "Desktop",
                      },
                      {
                        id: "downloads",
                        label: "Downloads",
                      },
                      {
                        id: "documents",
                        label: "Documents",
                      },
                    ].map(({ id, label }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          {...rest}
                          checked={field.value?.includes(id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? onChange([...field.value, id])
                              : onChange(
                                  field.value?.filter((item) => item !== id)
                                );
                          }}
                          disabled={fieldState.isSubmitting}
                          {...accessibility}
                        />
                        <FieldLabel>{label}</FieldLabel>
                      </div>
                    ))}
                  </div>
                  <FieldError className="small" />
                </>
              );
            }}
          </Field>
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default DemoForm;
