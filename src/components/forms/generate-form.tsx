"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { generateAdvertisement } from "@/actions/generate";
import { CLOUDINARY_FOLDERS } from "@/constants/cloudinary";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import type { UploadedImage } from "@/types/image-upload";
import {
  generationSchema,
  type GenerationInput,
} from "@/validators/generation";

import { ImageUpload } from "./image-upload";

export function GenerateForm() {
  const [productImage, setProductImage] = useState<UploadedImage | null>(null);
  const [modelImage, setModelImage] = useState<UploadedImage | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GenerationInput>({
    resolver: zodResolver(generationSchema),
    defaultValues: {
      projectName: "",
      productName: "",
      description: "",
      orientation: "portrait",
    },
  });

  async function onSubmit(data: GenerationInput) {
    if (!productImage) {
      toast.error("Upload a product image.");
      return;
    }

    try {
      await generateAdvertisement({
        ...data,
        productImage,
        modelImage: modelImage ?? undefined,
      });

      toast.success("Advertisement generation started.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate advertisement.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>

        <Input id="projectName" {...register("projectName")} />

        {errors.projectName && (
          <p className="text-sm text-red-500">{errors.projectName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>

        <Input id="productName" {...register("productName")} />

        {errors.productName && (
          <p className="text-sm text-red-500">{errors.productName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea id="description" {...register("description")} />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orientation">Orientation</Label>

        <Select id="orientation" {...register("orientation")}>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </Select>

        {errors.orientation && (
          <p className="text-sm text-red-500">{errors.orientation.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ImageUpload
          label="Product Image"
          folder={CLOUDINARY_FOLDERS.PRODUCTS}
          value={productImage}
          onChange={setProductImage}
        />

        <ImageUpload
          label="Model Image"
          folder={CLOUDINARY_FOLDERS.MODELS}
          value={modelImage}
          onChange={setModelImage}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Generating..." : "Generate Advertisement"}
      </Button>
    </form>
  );
}
