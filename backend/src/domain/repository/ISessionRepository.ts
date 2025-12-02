import { Session, SessionCreate, SessionUpdate } from "../entities/session.";

export interface ISessionRepository {
  createSession(data: SessionCreate): Promise<Session>;
  getSessionById(id: string): Promise<Session | null>;
  getSessionByToken(token: string): Promise<Session | null>;
  updateSession(id: string, data: SessionUpdate): Promise<Session | null>;
  deleteSession(id: string): Promise<void>;
}
