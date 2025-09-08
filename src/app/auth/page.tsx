"use client";

import AuthPage from "@/components/auth";
import { useAuth } from "@/services/auth/firebase";
import { redirect, RedirectType } from "next/navigation";

export default function Default() {
  const { user } = useAuth();
  if (user) redirect("/", RedirectType.replace);
  return <AuthPage />;
}
