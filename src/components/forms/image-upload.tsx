"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { uploadImageClient } from "@/lib/cloudinary/upload-client";
import { validateImage } from "@/lib/utils/file";
import type { UploadedImage } from "@/types/image-upload";

interface ImageUploadProps {
  value?: UploadedImage | null;
  folder: string;
  label: string;
  onChange(value: UploadedImage | null): void;
}

export function ImageUpload({
  value,
  folder,
  label,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSelect(file: File) {
    const error = validateImage(file);

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const image = await uploadImageClient({
        file,
        folder,
      });

      onChange(image);

      toast.success(`${label} uploaded.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Image upload failed.";

      toast.error(message);
    } finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            void handleSelect(file);
          }
        }}
      />

      {!value && (
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          className="h-40 w-full border-dashed"
        >
          <span className="flex flex-col items-center gap-3">
            {loading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <ImagePlus className="size-6" />
            )}

            <span className="text-sm text-muted-foreground">
              {loading ? "Uploading..." : "Click to upload"}
            </span>
          </span>
        </Button>
      )}

      {value && (
        <div className="relative overflow-hidden rounded-lg border">
          <Image
            src={value.secureUrl}
            alt={label}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-3 top-3"
            onClick={() => onChange(null)}
            aria-label={`Remove ${label}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
