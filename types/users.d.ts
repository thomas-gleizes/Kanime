import { Gender } from '@prisma/client';

interface UserMediaHandling {
  raw: string;
  content: string;
  type: string;
}

type Visibility = 'private' | 'public' | 'limited';

declare type User = {
  id: number;
  username: string;
  email: string;
  gender?: Gender;
  bio?: string;
  birthday?: string;
  city?: string;
  isAdmin: boolean;
  avatarPath: string;
  backgroundPath: string;
  followCount: number;
  followerCount: number;
  createdAt: string;
  updatedAt: string;
};

declare type Users = Array<User>;
