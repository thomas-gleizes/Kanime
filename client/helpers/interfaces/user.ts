import { File } from "./global";

export interface Media {
  background?: File;
  avatar?: File;
}

export default interface User {
  id: string;
  email: string;
  username: string;
  bio?: string;
  birthday?: Date;
  city?: string;
  follow?: Array<string>;
  media?: Media;
  admin: boolean;
  create_at: Date;
  updated_at: Date;
}
