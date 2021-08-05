import { Images } from "./global";

export interface Titles {
  en: string;
  en_jp: string;
  ja_jp: string;
}

export interface Season {
  value: number;
  year: string;
  full: string;
}

export interface Rating {
  average: number;
  rank: number;
}

export interface Popularity {
  user_count: number;
  rank: number;
}

export default interface Anime {
  _id: string;
  kitsu_id: number;
  slug: string;
  canonicalTitle: string;
  titles: Titles;
  synopsis: string;
  description: string;
  season: Season;
  rating: Rating;
  popularity: Popularity;
  date_begin: Date;
  date_end: Date;
  poster: Images;
  cover: Images;
  type: string;
  episode_count: number;
  episode_length: number;
  createdAt: Date;
  updatedAt: Date;
}
