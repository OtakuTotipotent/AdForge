import { Sparkles } from "lucide-react";

import { PageContainer } from "@/components/common/page-container";
import { GenerateForm } from "@/components/forms/generate-form";

export default function GeneratePage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4" />
            AI Advertisement Generator
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Generate Advertisement
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Provide your product details and reference images. AdForge AI will
            use them to create a premium advertisement.
          </p>
        </div>

        <GenerateForm />
      </div>
    </PageContainer>
  );
}
