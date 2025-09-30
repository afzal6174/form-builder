"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import Logo from "./header/logo";
import { ThemeToggle } from "./theme/toggle-button";

export function Header(props) {
  const pathname = usePathname();

  const headerRef = props?.ref ?? useRef(null);
  const lastScroll = useRef(0);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && headerRef.current) {
        headerRef.current.style.transform = "translateY(-100%)";
        headerRef.current.style.opacity = "0";
      } else if (headerRef.current) {
        headerRef.current.style.transform = "translateY(0)";
        headerRef.current.style.opacity = "1";
      }

      lastScroll.current = currentScroll;
    };
  }

  return (
    <header
      ref={headerRef}
      className="max-container flex items-center justify-between gap-4 border-b backdrop-blur-sm transition-all duration-500 ease-in-out"
      {...props}
    >
      <Logo />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {!["/sign-in", "/sign-up"].includes(pathname) && (
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">
                Sign in
                {/* <Link href="/sign-in">Sign in</Link> */}
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button>
                Sign up
                {/* <Link href="/sign-up">Sign up</Link> */}
              </Button>
            </SignUpButton>
          </SignedOut>
        )}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
