import { User, type IUser } from "@/features/user";

export class UserRepository {
  static create(data: IUser) {
    return User.create(data);
  }

  static findByClerkId(clerkId: string) {
    return User.findOne({ clerkId });
  }

  static updateByClerkId(clerkId: string, data: Partial<IUser>) {
    return User.findOneAndUpdate({ clerkId }, data, { new: true });
  }

  static deleteByClerkId(clerkId: string) {
    return User.findOneAndDelete({
      clerkId,
    });
  }
}
