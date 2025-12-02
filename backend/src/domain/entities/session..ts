export interface Session {
    id: string;
    user_id: string;
    refresh_token: string;
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface SessionCreate {
    user_id: string;
    refresh_token: string;
    expires_at: Date;
  }
  
  export interface SessionUpdate extends Partial<SessionCreate> {}