import { Types } from "mongoose";

import {
  GenerationModel,
  type GenerationCreationData,
  type GenerationUpdateData,
} from "@/models";

export class GenerationRepository {
  static create(data: GenerationCreationData) {
    return GenerationModel.create(data);
  }

  static findByUser(userId: string) {
    return GenerationModel.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  static findById(id: string) {
    return GenerationModel.findById(id).lean();
  }

  static update(id: string, data: GenerationUpdateData) {
    return GenerationModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
  }

  static delete(id: string) {
    return GenerationModel.findByIdAndDelete(id);
  }
}
