declare module 'app/model' {
  import { PrismaVisibility } from 'resources/prisma';

  declare type Visibility =
    | PrismaVisibility.public
    | PrismaVisibility.private
    | PrismaVisibility.limited;
}

type Images = {
  tiny?: string;
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
};

type Titles = {
  en?: string;
  en_jp?: string;
  ja_jp?: string;
};

type Rating = {
  average: number;
  rank: number;
};

type Popularity = {
  count: number;
  rank: number;
};

type Episode = {
  length: number | null;
  count: number | null;
};

type Episodes = Array<Episode>;

type EntryStatus = 'Wanted' | 'Watching' | 'Completed' | 'OnHold' | 'Dropped';
type Visibility = 'public' | 'private' | 'limited';

interface UserMediaHandling {
  raw: string;
  content: string;
  type: string;
}

declare type Anime = {
  id: number;
  kitsu_id: number;
  slug: string;
  canonicalTitle: string;
  titles: Titles;
  synopsis?: string;
  description?: string;
  season: 'Winter' | 'Springs' | 'Summer' | 'Fall' | string;
  season_year: string;
  rating: Rating;
  popularity: Popularity;
  dateBegin: any;
  dateEnd: any;
  poster: Images;
  cover: Images;
  episode: Episode;
  type: 'TV' | 'Movie' | 'OAV' | 'ONA' | 'OVA' | 'special' | 'music' | string;
  status: 'finished' | 'current' | 'unreleased' | 'tba' | 'upcoming';
  sagaId?: number;
} & { saga?: Saga; categories?: Categories; posts?: Posts; entries?: Entries };

type Animes = Array<Anime>;

declare type Entry = {
  animeId: number;
  userId: number;
  status: EntryStatus;
  rating: number;
  progress: number;
  startedAt: Date | string;
  finishAt: Date | string;
  note: string;
  visibility: Visibility;
  createAt: Date | string;
  updateAt: Date | string;
} & { user?: User; anime?: Anime };

declare type Entries = Array<Entry>;

declare type Post = {
  id: number;
  animeId: number;
  userId: number;
  content: string;
  idParent: number;
  createdAt: string;
  updateAt: string;
} & {
  user?: User;
  anime?: Anime;
  replyTo?: Post;
  replies?: Posts;
};
declare type Posts = Post[];

declare type User = {
  id: number;
  username: string;
  slug: string;
  email: string;
  gender: 'Male' | 'Female' | 'Secret';
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
} & { entries?: Entries; posts?: Posts };

declare type Users = Array<User>;

declare type Log = {
  id: number;
  path: string;
  ip: string;
  method: Method;
  body: any;
  params: any;
  user?: User | null;
  createAt: string;
} & { user?: User };

declare type Logs = Array<Log>;

declare type Saga = {
  id: number;
  slug: string;
  canonicalTitle: string;
  titles?: Titles;
  description?: string;
  created_at: Date | string;
  updated_at: Date | string;
} & { animes?: Animes };

declare type Sagas = Array<Saga>;

declare type Category = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  totalMediaCount: number;
};

declare type Categories = Array<Category>;
