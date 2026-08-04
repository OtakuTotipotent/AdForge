"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui";

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
        <UserButton
          showName
          appearance={{
            elements: {
              avatarBox: "size-9",
            },
          }}
        />
      </Show>
    </>
  );
}
