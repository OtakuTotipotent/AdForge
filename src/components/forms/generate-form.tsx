"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import { generateSchema } from "@/validators/generation";

import { uploadImage } from "@/actions/generate";
import { ImageUpload } from "./image-upload";

type FormValues = {
  projectName: string;
  productName: string;
  prompt: string;
  orientation: "portrait" | "landscape";
};

export function GenerateForm() {
  const [productImage, setProductImage] = useState<File>();

  const [modelImage, setModelImage] = useState<File>();

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
    if (!productImage || !modelImage) {
      toast.error("Upload both images.");

      return;
    }

    const productData = new FormData();

    productData.append("file", productImage);

    const modelData = new FormData();

    modelData.append("file", modelImage);

    try {
      const product = await uploadImage(productData);

      const model = await uploadImage(modelData);

      console.log(data);

      console.log(product);

      console.log(model);

      toast.success("Images uploaded.");
    } catch {
      toast.error("Upload failed.");
    }
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

      <div className="grid gap-6 md:grid-cols-2">
        <ImageUpload title="Product Image" onFile={setProductImage} />

        <ImageUpload title="Model Image" onFile={setModelImage} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Generate Advertisement
      </Button>
    </form>
  );
}
