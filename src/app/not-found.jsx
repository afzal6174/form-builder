import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>

      <Button className="mt-4" asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </main>
  );
}
