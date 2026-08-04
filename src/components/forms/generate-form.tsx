"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import { generateSchema } from "@/validators/generation";

type FormValues = {
  projectName: string;
  productName: string;
  prompt: string;
  orientation: "portrait" | "landscape";
};

export function GenerateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      projectName: "",
      productName: "",
      prompt: "",
      orientation: "portrait",
    },
  });

  async function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Project Name</Label>

        <Input {...register("projectName")} />

        <p className="text-sm text-red-500">{errors.projectName?.message}</p>
      </div>

      <div className="space-y-2">
        <Label>Product Name</Label>

        <Input {...register("productName")} />

        <p className="text-sm text-red-500">{errors.productName?.message}</p>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea {...register("prompt")} />

        <p className="text-sm text-red-500">{errors.prompt?.message}</p>
      </div>

      <div className="space-y-2">
        <Label>Orientation</Label>

        <Select {...register("orientation")}>
          <option value="portrait">Portrait</option>

          <option value="landscape">Landscape</option>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Generate Advertisement
      </Button>
    </form>
  );
}
