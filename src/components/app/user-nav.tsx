import { Button } from "@/components/ui/button";

export function UserNav() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground text-sm">20 Credits</span>

      <Button variant="outline">Sign In</Button>
    </div>
  );
}
