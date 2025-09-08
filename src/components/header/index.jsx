"use client";

import { useAuth } from "@/services/auth/firebase";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ThemeToggle } from "../theme/toggle-button";
import Logo from "./logo";
import { UserMenu } from "./user-menu";

export function SiteHeader(props) {
  const { user } = useAuth();
  const pathname = usePathname();
  const isAuthPage = ["/", "/auth"].includes(pathname) && !user;

  const headerRef = props?.ref ?? useRef(null);
  const lastScroll = useRef(0);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current) {
        headerRef.current.style.transform = "translateY(-100%)";
      } else {
        headerRef.current.style.transform = "translateY(0)";
      }

      lastScroll.current = currentScroll;
    };
  }

  return (
    <header
      ref={headerRef}
      {...props}
      className="bg-card text-card-foreground flex w-full items-center border-b"
    >
      <div className="max-container flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          {!isAuthPage && <UserMenu user={user} />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
