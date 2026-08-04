import { GenerationRepository } from "@/repositories";

export class GenerationService {
  static create(data: object) {
    return GenerationRepository.create(data);
  }

  static findUserGenerations(userId: string) {
    return GenerationRepository.findByUser(userId);
  }

  static findById(id: string) {
    return GenerationRepository.findById(id);
  }

  static update(id: string, data: object) {
    return GenerationRepository.update(id, data);
  }

  static delete(id: string) {
    return GenerationRepository.delete(id);
  }
}
