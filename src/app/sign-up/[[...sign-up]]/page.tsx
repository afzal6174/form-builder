import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="bg-muted flex w-full items-center justify-center max-container py-6 md:py-10">
      <SignUp />
    </main>
  );
}
