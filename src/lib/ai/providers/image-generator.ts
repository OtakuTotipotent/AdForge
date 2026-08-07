import "server-only";

export interface GenerateAdvertisementInput {
  projectName: string;
  productName: string;
  description: string;
  orientation: "portrait" | "landscape";
  productImage: string;
  modelImage: string;
}

export interface GeneratedAdvertisement {
  imageUrl: string;
  prompt: string;
  provider: string;
}

export interface ImageGeneratorProvider {
  generate(input: GenerateAdvertisementInput): Promise<GeneratedAdvertisement>;
}
