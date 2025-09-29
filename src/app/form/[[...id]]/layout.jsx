"use client";

import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";

export default function FormLayout({ edit, preview }) {
  const params = useParams();
  const formId = params?.id?.[0];

  return (
    <main className="max-container bg-muted py-6 md:py-10">
      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <Form name={formId ?? "uninitialized-form"}>
          <TabsContent value="edit">
            <section>{edit}</section>
          </TabsContent>
          <TabsContent value="preview" className="flex gap-4">
            <section className="flex-1 hidden lg:block">{edit}</section>
            <section className="flex-1">{preview}</section>
          </TabsContent>
        </Form>
      </Tabs>
    </main>
  );
}
