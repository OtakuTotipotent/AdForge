import "server-only";

import { UserModel } from "@/models/user.model";

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

  static create(data: Partial<InstanceType<typeof UserModel>>) {
    return UserModel.create(data);
  }

  static updateByClerkId(
    clerkId: string,
    data: Partial<InstanceType<typeof UserModel>>,
  ) {
    return UserModel.findOneAndUpdate({ clerkId }, data, {
      new: true,
    });
  }

  static deleteByClerkId(clerkId: string) {
    return UserModel.findOneAndDelete({ clerkId });
  }
}
