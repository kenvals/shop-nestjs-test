import { UserJwtPayload } from "./user-jwt-payload.interface";

export interface IJwtPayload {
  type: string,
  payload: UserJwtPayload
}