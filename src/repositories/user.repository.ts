import "server-only";

import { UserModel } from "@/models/user.model";
import type { UserDocument } from "@/models/user.model";

export class UserRepository {
  static findByClerkId(clerkId: string) {
    return UserModel.findOne({ clerkId });
  }

  static findById(id: string) {
    return UserModel.findById(id);
  }

  static findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  static create(data: Partial<UserDocument>) {
    return UserModel.create(data);
  }

  static updateByClerkId(clerkId: string, data: Partial<UserDocument>) {
    return UserModel.findOneAndUpdate({ clerkId }, data, {
      new: true,
    });
  }

  static upsert(clerkId: string, data: Partial<UserDocument>) {
    return UserModel.findOneAndUpdate({ clerkId }, data, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  static deleteByClerkId(clerkId: string) {
    return UserModel.findOneAndDelete({ clerkId });
  }
}
