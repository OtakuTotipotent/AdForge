import { getCurrentUserAction } from "@/actions";

export default async function GeneratePage() {
  const user = await getCurrentUserAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Generate</h1>

        <p className="text-muted-foreground">Welcome {user.username}</p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-2 text-lg font-semibold">Account</h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Credits:</strong> {user.credits}
          </p>

          <p>
            <strong>Plan:</strong> {user.subscription}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
