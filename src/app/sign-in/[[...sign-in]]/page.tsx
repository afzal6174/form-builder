import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="bg-muted flex w-full items-center justify-center max-container py-6 md:py-10">
      <SignIn />
    </main>
  );
}
