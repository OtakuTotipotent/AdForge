import { Button } from "@/components/ui/button";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <div className="">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </Show>
    </div>
  );
}
