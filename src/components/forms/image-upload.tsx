"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { ImagePlus } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface Props {
  title: string;
  onFile(file: File): void;
}

export function ImageUpload({ title, onFile }: Props) {
  const [preview, setPreview] = useState<string>();

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];

      if (!file) return;

      setPreview(URL.createObjectURL(file));

      onFile(file);
    },
    [onFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="relative flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed"
    >
      <input {...getInputProps()} />

      {preview ? (
        <Image fill alt={title} src={preview} className="object-cover" />
      ) : (
        <div className="text-center">
          <ImagePlus className="mx-auto mb-3 size-10" />

          <p>{title}</p>
        </div>
      )}
    </div>
  );
}
