"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteGeneration } from "@/actions/collection";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

interface CollectionActionsProps {
  generationId: string;
  redirectToCollections?: boolean;
}

export function CollectionActions({
  generationId,
  redirectToCollections = false,
}: CollectionActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Delete this advertisement? This cannot be undone.")) {
      return;
    }

    try {
      const result = await deleteGeneration(generationId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Advertisement deleted.");

      if (redirectToCollections) {
        router.push(ROUTES.COLLECTIONS);
        return;
      }

      router.refresh();
    } catch {
      toast.error("Unable to delete this advertisement.");
    }
  }

  return (
    <Button type="button" variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="mr-2 size-4" />
      Delete
    </Button>
  );
}
