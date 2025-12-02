import { prisma } from "../config/db";
import { ISessionRepository } from "../../domain/repository/ISessionRepository";
import {
  Session,
  SessionCreate,
  SessionUpdate,
} from "../../domain/entities/session.";
import { mapPrismaSessionToDomain } from "../mapper/session-mapper";
import { injectable } from "inversify";

@injectable()
export class SessionRepository implements ISessionRepository {
  async createSession(data: SessionCreate): Promise<Session> {
    const session = await prisma.session.create({
      data: {
        user_id: data.user_id,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
      },
    });
    return mapPrismaSessionToDomain(session);
  }

  async getSessionById(id: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: { id },
    });
    return session ? mapPrismaSessionToDomain(session) : null;
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    const session = await prisma.session.findFirst({
      where: { refresh_token: token },
    });
    return session ? mapPrismaSessionToDomain(session) : null;
  }

  async updateSession(
    id: string,
    data: SessionUpdate
  ): Promise<Session | null> {
    const updateData: any = {};
    if (data.user_id !== undefined) updateData.user_id = data.user_id;
    if (data.refresh_token !== undefined)
      updateData.refresh_token = data.refresh_token;
    if (data.expires_at !== undefined) updateData.expires_at = data.expires_at;

    const session = await prisma.session.update({
      where: { id },
      data: updateData,
    });
    return mapPrismaSessionToDomain(session);
  }

  async deleteSession(id: string): Promise<void> {
    await prisma.session.delete({
      where: { id },
    });
  }
}
