"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldArray,
  FieldError,
  FieldLabel,
  useFormContext,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  ChevronsUpDown,
  CircleDot,
  Copy,
  ListChevronsDownUp,
  Plus,
  SquareCheck,
  TextCursorInput,
  TextSelect,
  Trash2,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function FormEditor() {
  // const { id: formId } = await params;
  // const { template } = await searchParams;

  const params = useParams();
  const formId = params?.id?.[0];

  const router = useRouter();
  const fieldTypes = {
    text: [
      {
        value: "short_answer",
        label: "Short answer",
        icon: TextCursorInput,
      },
      {
        value: "paragraph",
        label: "Paragraph",
        icon: TextSelect,
      },
    ],
    choice: [
      {
        value: "multiple_choice",
        label: "Multiple choice",
        icon: CircleDot,
      },
      {
        value: "checkbox",
        label: "Checkboxes",
        icon: SquareCheck,
      },
      {
        value: "dropdown",
        label: "Dropdown Select",
        icon: ListChevronsDownUp,
      },
    ],
  };

  const fieldsMap = {
    short_answer: {
      placeholder: true,
      // validation: {number: {}}
    },
    paragraph: {
      placeholder: true,
    },
    multiple_choice: {
      options: true,
      icon: CircleDot,
    },

    checkbox: {
      options: true,
      icon: SquareCheck,
    },

    dropdown: {
      placeholder: true,
      options: true,
      icon: ListChevronsDownUp,
    },
  };

  const initializeForm = () => {
    if (!formId) {
      const formId = nanoid();

      window.history.replaceState(null, "", `/form/${formId}`);
    }
  };

  const form = useFormContext();

  const { dirtyFields } = form.formState;
  const isDirty = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    if (isDirty) {
      initializeForm();
    }
  }, [isDirty]);

  return (
    <Card>
      <div className="bg-background p-4">
        <CardHeader className="w-full max-w-lg mx-auto">
          <Field
            name="formLabel"
            defaultValue="Untitled Form"
            rules={{
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            }}
          >
            {({ field, accessibility }) => (
              <>
                <FieldLabel className="sr-only">Form Name</FieldLabel>
                <Input
                  {...field}
                  {...accessibility}
                  placeholder="Write a form name..."
                  className="border-0 border-b-2 large rounded-b-none rounded-t-sm  focus-visible:ring-0"
                />
                <FieldError className="small" />
              </>
            )}
          </Field>

          <Field name="formDescription">
            {({ field, accessibility }) => (
              <>
                <FieldLabel className="sr-only">Form Description</FieldLabel>
                <Textarea
                  {...field}
                  {...accessibility}
                  placeholder="Write a form descripition..."
                  className="border-0 border-b-2 text-muted-foreground rounded-b-none rounded-t-sm min-h-auto focus-visible:ring-0"
                />
              </>
            )}
          </Field>
        </CardHeader>
      </div>

      <CardContent className="w-full max-w-lg mx-auto space-y-4">
        <FieldArray name="questions">
          {({ fields, append, insert, remove }) => {
            return (
              <>
                {fields.map((item, qIndex) => {
                  const type = form.watch(`questions.${qIndex}.type`);

                  return (
                    <div
                      key={item.id}
                      className="bg-muted p-4 rounded-lg flex flex-col gap-2"
                    >
                      <Collapsible className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Field
                            name={`questions.${qIndex}.type`}
                            defaultValue={item.type}
                            className="flex-1"
                          >
                            {({ field, accessibility }) => {
                              const { onChange, onBlur, ...rest } = field;

                              return (
                                <>
                                  <FieldLabel className="sr-only">
                                    Field Type
                                  </FieldLabel>
                                  <Select
                                    {...rest}
                                    onValueChange={onChange}
                                    onOpenChange={(open) => {
                                      if (!open) onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      {...accessibility}
                                      className="w-full min-w-4"
                                    >
                                      <SelectValue
                                        placeholder={
                                          <span className="truncate">
                                            Select a question type...
                                          </span>
                                        }
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldTypes[item.group].map(
                                        ({ value, label, icon: Icon }) => (
                                          <SelectItem key={value} value={value}>
                                            <Icon />
                                            {label}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                </>
                              );
                            }}
                          </Field>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              insert(qIndex + 1, {
                                type,
                                group: item.group,
                                label: form.watch(`questions.${qIndex}.label`),
                                description: form.watch(
                                  `questions.${qIndex}.description`
                                ),
                                defaultValue: form.watch(
                                  `questions.${qIndex}.defaultValue`
                                ),
                                placehoder: form.watch(
                                  `questions.${qIndex}.placehoder`
                                ),
                                required: form.watch(
                                  `questions.${qIndex}.required`
                                ),
                                options:
                                  form.watch(`questions.${qIndex}.options`) ||
                                  [],
                              });
                            }}
                          >
                            <Copy className="size-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(qIndex)}
                          >
                            <Trash2 className="size-5" />
                          </Button>
                          <CollapsibleTrigger asChild>
                            <Button type="button" variant="ghost" size="icon">
                              <ChevronsUpDown className="size-5" />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Field
                              name={`questions.${qIndex}.defaultValue`}
                              className="flex-1"
                            >
                              {({ field, accessibility }) => (
                                <>
                                  <FieldLabel className="sr-only">
                                    Default Value
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    {...accessibility}
                                    placeholder="Write a default value..."
                                    className="border-0 border-b-2 rounded-b-none rounded-t-sm  focus-visible:ring-0"
                                  />
                                </>
                              )}
                            </Field>

                            <Separator
                              orientation="vertical"
                              className="mx-1 h-full"
                            />

                            <Field name={`questions.${qIndex}.required`}>
                              {({ field, accessibility }) => (
                                <div className="flex items-center gap-2">
                                  <FieldLabel>Required</FieldLabel>
                                  <Switch
                                    {...accessibility}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </div>
                              )}
                            </Field>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator className="my-2" />

                      <Field
                        name={`questions.${qIndex}.label`}
                        defaultValue={`Untitled Question ${qIndex + 1}`}
                      >
                        {({ field, accessibility }) => (
                          <>
                            <FieldLabel className="sr-only">
                              Question
                            </FieldLabel>
                            <Input
                              {...field}
                              {...accessibility}
                              placeholder="Write a question..."
                              className="border-0 border-b-2 medium rounded-b-none rounded-t-sm  focus-visible:ring-0"
                            />
                          </>
                        )}
                      </Field>

                      <Field name={`questions.${qIndex}.description`}>
                        {({ field, accessibility }) => (
                          <>
                            <FieldLabel className="sr-only">
                              Question Description
                            </FieldLabel>
                            <Textarea
                              {...field}
                              {...accessibility}
                              placeholder="Write a descripition..."
                              className="border-0 border-b-2 text-muted-foreground rounded-b-none rounded-t-sm min-h-auto focus-visible:ring-0"
                            />
                          </>
                        )}
                      </Field>

                      {fieldsMap[type]?.placeholder && (
                        <>
                          <Field name={`questions.${qIndex}.placehoder`}>
                            {({ field, accessibility }) => (
                              <>
                                <FieldLabel className="sr-only">
                                  Placeholder
                                </FieldLabel>
                                <Input
                                  {...field}
                                  {...accessibility}
                                  placeholder="Write a placehoder..."
                                  className="text-muted-foreground"
                                />
                              </>
                            )}
                          </Field>
                        </>
                      )}

                      {item.group === "choice" && (
                        <FieldArray name={`questions.${qIndex}.options`}>
                          {({ fields: options, append, remove }) => {
                            const Icon = fieldsMap[type]?.icon;
                            return (
                              <div className="space-y-2">
                                {options.map((option, oIndex) => (
                                  <div
                                    key={option.id}
                                    className="flex items-center gap-2"
                                  >
                                    {Icon && <Icon className="size-5" />}
                                    <Field
                                      name={`questions.${qIndex}.options.${oIndex}.label`}
                                      className="flex-1"
                                    >
                                      {({ field, accessibility }) => (
                                        <>
                                          <FieldLabel className="sr-only">
                                            Option
                                          </FieldLabel>
                                          <Input
                                            {...field}
                                            {...accessibility}
                                            placeholder="Write an option..."
                                            className="border-0 hover:border-b focus:border-b rounded-b-none rounded-t-sm  focus-visible:ring-0"
                                          />
                                        </>
                                      )}
                                    </Field>
                                    <Button
                                      type="button"
                                      onClick={() => remove(oIndex)}
                                      className="bg-destructive/70 hover:bg-destructive/20 text-destructive-foreground"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}

                                <div className="flex items-center gap-2">
                                  {Icon && <Icon className="size-5" />}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() =>
                                      append({
                                        label: `Option ${options.length + 1}`,
                                      })
                                    }
                                    className="flex-1 justify-start"
                                  >
                                    Add Option
                                  </Button>
                                </div>
                              </div>
                            );
                          }}
                        </FieldArray>
                      )}
                    </div>
                  );
                })}

                <div className="mt-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button">
                        <Plus />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      align="start"
                      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    >
                      {Object.keys(fieldTypes).map((group, qIndex, array) => (
                        <Fragment key={group}>
                          <DropdownMenuGroup>
                            {fieldTypes[group].map(
                              ({ value, label, icon: Icon }) => (
                                <DropdownMenuItem
                                  key={value}
                                  onClick={() =>
                                    append({
                                      type: value,
                                      group,
                                    })
                                  }
                                >
                                  <Icon />
                                  {label}
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuGroup>
                          {qIndex < array.length - 1 && (
                            <DropdownMenuSeparator />
                          )}
                        </Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            );
          }}
        </FieldArray>
      </CardContent>
    </Card>
  );
}
