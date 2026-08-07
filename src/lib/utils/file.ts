export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function validateImage(file: File): string | null {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type as (typeof ALLOWED_IMAGE_TYPES)[number],
    )
  ) {
    return "Only JPG, PNG and WEBP images are allowed.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Maximum image size is 5 MB.";
  }

  return null;
}
