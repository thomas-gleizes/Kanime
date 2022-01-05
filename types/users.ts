import { Gender } from '@prisma/client';

export interface UserMediaHandling {
  raw: string;
  content: string;
  type: string;
}

export declare type User = {
  id: number;
  email: string;
  login: string;
  token?: string;
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
