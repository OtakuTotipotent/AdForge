import { GenerationRepository } from "@/repositories";
import type { GenerationCreationData, GenerationUpdateData } from "@/models";

import { GoogleImageProvider } from "@/lib/ai/providers/google-image";
import type { GenerateAdvertisementInput } from "@/lib/ai/providers/image-generator";
import { uploadGeneratedImage } from "@/lib/cloudinary/upload-generated";

const imageProvider = new GoogleImageProvider();

export class GenerationService {
  static create(data: GenerationCreationData) {
    return GenerationRepository.create(data);
  }

  static findUserGenerations(userId: string) {
    return GenerationRepository.findByUser(userId);
  }

  static findById(id: string) {
    return GenerationRepository.findById(id);
  }

  static update(id: string, data: GenerationUpdateData) {
    return GenerationRepository.update(id, data);
  }

  static delete(id: string) {
    return GenerationRepository.delete(id);
  }

  static async generate(data: GenerationCreationData) {
    const generation = await GenerationRepository.create(data);

    try {
      await GenerationRepository.update(generation._id.toString(), {
        status: "processing",
      });

      const input: GenerateAdvertisementInput = {
        projectName: generation.projectName,
        productName: generation.productName,
        description: generation.description,
        orientation: generation.orientation,
        productImage: {
          publicId: generation.productImagePublicId,
          secureUrl: generation.productImageUrl,
        },
        ...(generation.modelImagePublicId && generation.modelImageUrl
          ? {
              modelImage: {
                publicId: generation.modelImagePublicId,
                secureUrl: generation.modelImageUrl,
              },
            }
          : {}),
      };

      const generated = await imageProvider.generate(input);

      const uploaded = await uploadGeneratedImage(
        generated.imageBuffer,
        generated.mimeType,
      );

      const completed = await GenerationRepository.update(
        generation._id.toString(),
        {
          prompt: generated.prompt,
          generatedImagePublicId: uploaded.publicId,
          generatedImageUrl: uploaded.secureUrl,
          status: "completed",
          errorMessage: null,
        },
      );

      if (!completed) {
        throw new Error("Unable to update completed generation.");
      }

      return completed;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Generation failed.";

      await GenerationRepository.update(generation._id.toString(), {
        status: "failed",
        errorMessage,
      });

      throw error;
    }
  }
}
