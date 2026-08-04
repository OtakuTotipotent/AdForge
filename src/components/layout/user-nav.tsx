import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function UserNav() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton>
            <Button variant="ghost">Sign In</Button>
          </SignInButton>

          <SignUpButton>
            <Button>Get Started</Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
