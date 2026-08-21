import { UserRound } from "lucide-react";

import { PageContainer } from "@/components/common/page-container";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { GENERATION_COST } from "@/constants/credits";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { getCurrentUser } from "@/lib/auth/current-user";
import { GenerationService } from "@/services";

function getDisplayName(
  name: string | null | undefined,
  username: string | null | undefined,
  email: string | null | undefined,
) {
  return name || username || email || "AdForge user";
}

export default async function ProfilePage() {
  const [clerkUser, dbUser] = await Promise.all([
    getCurrentUser(),
    getCurrentDbUser(),
  ]);

  const generationCount = dbUser
    ? await GenerationService.countUserGenerations(dbUser._id.toString())
    : null;

  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ?? dbUser?.email ?? null;
  const displayName = getDisplayName(
    clerkUser?.fullName,
    clerkUser?.username ?? dbUser?.username,
    email,
  );
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <PageContainer>
      <div className="max-w-4xl">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Account</p>
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Your AdForge account and generation activity.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div
                  aria-label={`${displayName} avatar`}
                  className="flex size-14 items-center justify-center rounded-full bg-muted text-lg font-semibold"
                >
                  {initials || <UserRound className="size-6" aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{displayName}</p>
                  {email ? (
                    <p className="truncate text-sm text-muted-foreground">{email}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Email information is unavailable.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-muted/30 p-4 text-sm">
                <p className="font-medium">Manage your Clerk account</p>
                <p className="mt-1 leading-6 text-muted-foreground">
                  Use the profile menu in the header to update your identity, email,
                  profile image, and authentication settings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AdForge account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              {dbUser ? (
                <>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="success" className="mt-2">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plan</p>
                    <p className="mt-1 capitalize">{dbUser.plan.toLowerCase()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member since</p>
                    <p className="mt-1">{dbUser.createdAt.toLocaleDateString()}</p>
                  </div>
                </>
              ) : (
                <p className="leading-6 text-muted-foreground">
                  Your AdForge account is still being set up. Try refreshing in a moment.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dbUser?.credits ?? "—"}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Each advertisement generation costs {GENERATION_COST} credits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generation activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{generationCount ?? "—"}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Total advertisements created in your collection.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageContainer>
  );
}
