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
  average: Nullable<number>;
  rank: Nullable<number>;
};

type Popularity = {
  count: Nullable<number>;
  rank: Nullable<number>;
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
  kitsuId: Nullable<number>;
  slug: string;
  canonicalTitle: string;
  titles: Nullable<Titles>;
  synopsis: Nullable<string>;
  description: Nullable<string>;
  season: Nullable<'Winter' | 'Springs' | 'Summer' | 'Fall'>;
  season_year: Nullable<string>;
  rating: Rating;
  popularity: Popularity;
  dateBegin: Nullable<string>;
  dateEnd: Nullable<string>;
  poster: Nullable<Images>;
  cover: Nullable<Images>;
  episode: Episode;
  type: Nullable<'TV' | 'movie' | 'OAV' | 'ONA' | 'OVA' | 'special' | 'music'>;
  status: Nullable<'finished' | 'current' | 'unreleased' | 'tba' | 'upcoming'>;
  sagaId: Nullable<number>;
} & { saga?: Saga; categories?: Categories; posts?: Posts; entries?: Entries };

type Animes = Array<Anime>;

declare type Entry = {
  id: number;
  animeId: number;
  userId: number;
  status: EntryStatus;
  rating: Nullable<number>;
  progress: Nullable<number>;
  startedAt: Nullable<Date | string>;
  finishAt: Nullable<Date | string>;
  note: Nullable<string>;
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
  idParent: Nullable<number>;
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
  bio: Nullable<string>;
  birthday: Nullable<string>;
  city: Nullable<string>;
  isAdmin: boolean;
  avatarPath: Nullable<string>;
  backgroundPath: Nullable<string>;
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
  titles: Nullable<Titles>;
  description: Nullable<string>;
  created_at: Date | string;
  updated_at: Date | string;
} & { animes?: Animes };

declare type Sagas = Array<Saga>;

declare type Category = {
  id: number;
  slug: string;
  name: string;
  description: Nullable<string>;
  totalMediaCount: number;
};

declare type Categories = Array<Category>;

declare type Country = {
  id: number;
  iso: string;
  iso3: string | null;
  name: string;
  nicename: string;
};

declare type Countries = Array<Country>;
