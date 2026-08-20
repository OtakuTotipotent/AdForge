"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { generateAdvertisement } from "@/actions/generate";
import { CLOUDINARY_FOLDERS } from "@/constants/cloudinary";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui";
import type { UploadedImage } from "@/types/image-upload";
import {
  generationSchema,
  type GenerationInput,
} from "@/validators/generation";

import { ImageUpload } from "./image-upload";

export function GenerateForm() {
  const [productImage, setProductImage] = useState<UploadedImage | null>(null);
  const [modelImage, setModelImage] = useState<UploadedImage | null>(null);
  const [result, setResult] = useState<{
    id: string;
    generatedImageUrl: string | null;
  } | null>(null);

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
      setResult(null);

      const generated = await generateAdvertisement({
        ...data,
        productImage,
        modelImage: modelImage ?? undefined,
      });

      setResult({
        id: generated.id,
        generatedImageUrl: generated.generatedImageUrl ?? null,
      });
      toast.success("Advertisement generated successfully.");
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

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Advertisement</CardTitle>
            <CardDescription>
              Your advertisement is ready and saved to Collections.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {result.generatedImageUrl ? (
              <Image
                src={result.generatedImageUrl}
                alt="Generated advertisement"
                width={1200}
                height={1200}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Generation completed, but no image URL was returned.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </form>
  );
}
