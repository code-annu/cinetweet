import { prisma } from "../config/db";
import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User, UserCreate, UserUpdate } from "../../domain/entities/user";
import { mapPrismaUserToDomain } from "../mapper/user-mapper";

@injectable()
export class UserRepository implements IUserRepository {
  async createUser(data: UserCreate): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password_hash: data.password_hash,
        fullname: data.fullname,
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.profile_picture !== undefined && {
          profile_picture: data.profile_picture,
        }),
      },
    });
    return mapPrismaUserToDomain(user);
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? mapPrismaUserToDomain(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? mapPrismaUserToDomain(user) : null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user ? mapPrismaUserToDomain(user) : null;
  }

  async searchUsersByUsername(username: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      orderBy: {
        username: "asc",
      },
    });
    return users.map(mapPrismaUserToDomain);
  }

  async updateUser(id: string, data: UserUpdate): Promise<User | null> {
    const updateData: any = {};
    if (data.email !== undefined) updateData.email = data.email;
    if (data.username !== undefined) updateData.username = data.username;
    if (data.password_hash !== undefined)
      updateData.password_hash = data.password_hash;
    if (data.fullname !== undefined) updateData.fullname = data.fullname;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profile_picture !== undefined)
      updateData.profile_picture = data.profile_picture;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return mapPrismaUserToDomain(user);
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
