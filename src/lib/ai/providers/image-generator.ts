import "server-only";

export interface UploadedImage {
  publicId: string;
  secureUrl: string;
}

export interface GenerateAdvertisementInput {
  projectName: string;
  productName: string;
  description: string;
  orientation: "portrait" | "landscape";
  productImage: UploadedImage;
  modelImage?: UploadedImage;
}

export interface GeneratedAdvertisement {
  imageBuffer: Buffer;
  mimeType: string;
  prompt: string;
  provider: "google";
}

export interface ImageGeneratorProvider {
  generate(input: GenerateAdvertisementInput): Promise<GeneratedAdvertisement>;
}
