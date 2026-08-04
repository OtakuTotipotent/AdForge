import { PageContainer } from "@/components/common/page-container";
import { GenerateForm } from "@/components/forms/generate-form";

export default function GeneratePage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Generate Advertisement</h1>

        <GenerateForm />
      </div>
    </PageContainer>
  );
}
