import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="max-container">
      <div className="relative max-w-xl mx-auto my-4">
        <Form
          name="form-1"
          className="w-full bg-muted/50 p-6 rounded-lg shadow-lg"
        ></Form>

        <Button type="button" className="mt-4 flex justify-start">
          <Plus />
        </Button>
      </div>
    </main>
  );
}
