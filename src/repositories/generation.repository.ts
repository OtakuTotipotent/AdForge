import "server-only";

import { GenerationModel } from "@/models";

export class GenerationRepository {
  static create(data: object) {
    return GenerationModel.create(data);
  }

  static findById(id: string) {
    return GenerationModel.findById(id);
  }

  static findByUser(userId: string) {
    return GenerationModel.find({ userId }).sort({
      createdAt: -1,
    });
  }

  static delete(id: string) {
    return GenerationModel.findByIdAndDelete(id);
  }

  static update(id: string, data: object) {
    return GenerationModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
