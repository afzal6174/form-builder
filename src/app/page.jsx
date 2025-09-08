"use client";

import AuthPage from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/services/auth/firebase";
import { Plus } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  if (!user) return <AuthPage />;

  return (
    <main className="max-container my-4">
      <div className="relative max-w-xl mx-auto">
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
