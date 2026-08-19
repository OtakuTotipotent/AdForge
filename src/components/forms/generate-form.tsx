"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import { CLOUDINARY_FOLDERS } from "@/constants/cloudinary";
import { generateAdvertisement } from "@/actions/generate";
import {
  generationSchema,
  type GenerationInput,
} from "@/validators/generation";

import { ImageUpload } from "./image-upload";

const DEFAULT_VALUES: Partial<GenerationInput> = {
  projectName: "",
  productName: "",
  description: "",
  orientation: "portrait",
};

export function GenerateForm() {
  const [productImage, setProductImage] = useState<
    GenerationInput["productImage"] | null
  >(null);

  const [modelImage, setModelImage] = useState<
    GenerationInput["modelImage"] | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GenerationInput>({
    resolver: zodResolver(generationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: GenerationInput) {
    if (!productImage) {
      toast.error("Please upload a product image.");

      return;
    }

    try {
      const result = await generateAdvertisement({
        ...values,
        productImage,
        modelImage: modelImage ?? undefined,
      });

      console.log("Generation created:", result);

      toast.success("Advertisement generation started.");

      reset(DEFAULT_VALUES);

      setProductImage(null);
      setModelImage(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while starting generation.";

      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>

          <Input
            id="projectName"
            placeholder="Summer campaign"
            {...register("projectName")}
          />

          {errors.projectName?.message && (
            <p className="text-sm text-red-500">{errors.projectName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>

          <Input
            id="productName"
            placeholder="Premium skincare serum"
            {...register("productName")}
          />

          {errors.productName?.message && (
            <p className="text-sm text-red-500">{errors.productName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Product Description</Label>

          <Textarea
            id="description"
            placeholder="Describe the product, its benefits, target audience, and the desired advertising concept..."
            className="min-h-32 resize-y"
            {...register("description")}
          />

          {errors.description?.message && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="orientation">Orientation</Label>

          <Select id="orientation" {...register("orientation")}>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </Select>

          {errors.orientation?.message && (
            <p className="text-sm text-red-500">{errors.orientation.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Reference Images</h2>

          <p className="text-sm text-muted-foreground">
            Upload the product image and optionally provide a model reference.
          </p>
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

        {errors.productImage?.message && (
          <p className="text-sm text-red-500">{errors.productImage.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !productImage}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Starting Generation...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 size-4" />
            Generate Advertisement
          </>
        )}
      </Button>
    </form>
  );
}
