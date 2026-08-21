import "server-only";

import { GenerationRepository } from "@/repositories";
import type { GenerationCreationData, GenerationUpdateData } from "@/models";

import { connectToDatabase } from "@/lib/db";

import { GoogleImageProvider } from "@/lib/ai/providers/google-image";
import type { GenerateAdvertisementInput } from "@/lib/ai/providers/image-generator";
import { uploadGeneratedImage } from "@/lib/cloudinary/upload-generated";
import { deleteImage } from "@/lib/cloudinary/delete";

const imageProvider = new GoogleImageProvider();

export class GenerationService {
  static create(data: GenerationCreationData) {
    return GenerationRepository.create(data);
  }

  static findUserGenerations(userId: string) {
    return GenerationRepository.findByUser(userId);
  }

  static countUserGenerations(userId: string) {
    return GenerationRepository.countByUser(userId);
  }

  static async findPublicGenerations(limit = 24) {
    await connectToDatabase();

    return GenerationRepository.findPublic(limit);
  }

  static findById(id: string) {
    return GenerationRepository.findById(id);
  }

  static findUserGeneration(id: string, userId: string) {
    return GenerationRepository.findByUserAndId(id, userId);
  }

  static update(id: string, data: GenerationUpdateData) {
    return GenerationRepository.update(id, data);
  }

  static delete(id: string) {
    return GenerationRepository.delete(id);
  }

  static async deleteUserGeneration(id: string, userId: string) {
    const generation = await GenerationRepository.findByUserAndId(id, userId);

    if (!generation) {
      return false;
    }

    if (generation.generatedImagePublicId) {
      await deleteImage(generation.generatedImagePublicId);
    }

    await GenerationRepository.delete(id);

    return true;
  }

  static async generate(generationId: string) {
    const generation = await GenerationRepository.findById(generationId);

    if (!generation) {
      throw new Error("Generation not found.");
    }

    await GenerationRepository.update(generationId, {
      status: "processing",
      errorMessage: null,
    });

    try {
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

      const completed = await GenerationRepository.update(generationId, {
        prompt: generated.prompt,

        generatedImagePublicId: uploaded.publicId,
        generatedImageUrl: uploaded.secureUrl,

        status: "completed",
        errorMessage: null,
      });

      if (!completed) {
        throw new Error("Unable to update completed generation.");
      }

      return completed;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Advertisement generation failed.";

      await GenerationRepository.update(generationId, {
        status: "failed",
        errorMessage,
      });

      throw error;
    }
  }
}
