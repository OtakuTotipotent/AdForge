"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export function UserNav() {
  return (
    <>
      <Show when="signed-out">
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <Button variant="ghost">Sign In</Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button>Get Started</Button>
          </SignUpButton>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.PROFILE}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:inline-flex"
          >
            Profile
          </Link>
          <UserButton
            showName
            appearance={{
              elements: {
                avatarBox: "size-9",
              },
            }}
          />
        </div>
      </Show>
    </>
  );
}
