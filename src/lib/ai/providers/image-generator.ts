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
  imageUrl: string;
  prompt: string;
  provider: string;
}

export interface ImageGeneratorProvider {
  generate(input: GenerateAdvertisementInput): Promise<GeneratedAdvertisement>;
}
