import {
  DEFAULT_SUBSCRIPTION,
  DEFAULT_USER_CREDITS,
  DEFAULT_USER_ROLE,
  UserRepository,
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
} from "@/features/user";

export class UserService {
  static async createUser(data: CreateUserInput) {
    const input = createUserSchema.parse(data);

    const existingUser = await UserRepository.findByClerkId(input.clerkId);

    if (existingUser) {
      return existingUser;
    }

    return UserRepository.create({
      ...input,
      credits: DEFAULT_USER_CREDITS,

      role: DEFAULT_USER_ROLE,

      subscription: DEFAULT_SUBSCRIPTION,
    });
  }

  static updateUser(clerkId: string, data: UpdateUserInput) {
    const input = updateUserSchema.parse(data);

    return UserRepository.updateByClerkId(clerkId, input);
  }

  static deleteUser(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}
