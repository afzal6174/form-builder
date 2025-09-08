"use client";

import {
  ArrowLeftRight,
  BadgeCheck,
  LogIn,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/services/auth/firebase";
import Link from "next/link";
import { Button } from "../ui/button";

export function UserMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Avatar className="size-5 rounded-full">
            <AvatarImage
              src={user?.photoURL}
              alt={user?.displayName || "User Avatar"}
            />
            <AvatarFallback className="rounded-lg bg-transparent">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={6}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user?.photoURL} alt={user?.displayName} />
              <AvatarFallback className="rounded-lg">
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user?.displayName ?? "Guest User"}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowLeftRight />
                Switch Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {user ? (
            <Button
              variant="ghost"
              onClick={signOut}
              className="flex items-center justify-start gap-2 w-full"
            >
              <LogOut /> Log out
            </Button>
          ) : (
            <Link
              href="/auth"
              // prefetch={false}
              className="flex items-center gap-2 w-full"
            >
              <LogIn /> Log in
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
