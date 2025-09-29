"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "@/components/ui/form";

export default function FormPreviewPage() {
  // const { id: formId } = await params;
  // const { template } = await searchParams;

  const form = useFormContext();

  const formValues = form.watch();
  console.log("Form Values:", formValues);

  return (
    <Card>
      <CardHeader className="w-full max-w-lg mx-auto">
        <CardTitle>{formValues.formLabel}</CardTitle>
        <CardDescription>{formValues.formDescription}</CardDescription>
      </CardHeader>
    </Card>
  );
}
