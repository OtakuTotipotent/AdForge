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
  // static async createUser(data: CreateUserInput) {
  //   const input = createUserSchema.parse(data);

  //   const existingUser = await UserRepository.findByClerkId(input.clerkId);

  //   if (existingUser) {
  //     return existingUser;
  //   }

  //   return UserRepository.create({
  //     ...input,
  //     credits: DEFAULT_USER_CREDITS,

  //     role: DEFAULT_USER_ROLE,

  //     subscription: DEFAULT_SUBSCRIPTION,
  //   });
  // }

  static async createUser(data: CreateUserInput) {
    console.log("========== CREATE USER ==========");
    console.log(data);

    const input = createUserSchema.parse(data);

    console.log(input);

    const existingUser = await UserRepository.findByClerkId(input.clerkId);

    console.log("Existing:", existingUser);

    if (existingUser) {
      return existingUser;
    }

    const created = await UserRepository.create({
      ...input,
      credits: DEFAULT_USER_CREDITS,
      role: DEFAULT_USER_ROLE,
      subscription: DEFAULT_SUBSCRIPTION,
    });

    console.log("Created:", created);

    return created;
  }

  static updateUser(clerkId: string, data: UpdateUserInput) {
    const input = updateUserSchema.parse(data);

    return UserRepository.updateByClerkId(clerkId, input);
  }

  static deleteUser(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}
