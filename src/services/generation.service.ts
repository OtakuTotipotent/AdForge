import { GenerationRepository } from "@/repositories";
import type { GenerationCreationData, GenerationUpdateData } from "@/models";

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
}
