declare namespace Express {
  import { User } from "friend_of_all/domain";

  export interface Request {
    user: User,
  }
}