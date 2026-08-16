import { GenerationModel } from "@/models";

export class GenerationRepository {
  static create(data: object) {
    return GenerationModel.create(data);
  }

  static findByUser(userId: string) {
    return GenerationModel.find({ userId })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  static findById(id: string) {
    return GenerationModel.findById(id).lean();
  }

  static delete(id: string) {
    return GenerationModel.findByIdAndDelete(id);
  }
}
