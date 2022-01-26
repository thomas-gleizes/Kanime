import { EntryStatus } from '@prisma/client';

export type Images = {
  tiny?: string;
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
};

export type Titles = {
  en: string;
  en_jp: string;
  ja_jp: string;
};

export type Rating = {
  average: number;
  rank: number;
};

export type Popularity = {
  count: number;
  rank: number;
};

export type Episode = {
  length: number;
  count: number;
};

export type Episodes = Array<Episode>;

export type Category = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  totalMediaCount: number;
};

export type Categories = Array<Category>;

export type Anime = {
  id: number;
  kitsu_id: number;
  slug: string;
  canonicalTitle: string;
  titles: Titles | string;
  synopsis: string;
  description: string;
  season: 'Winter' | 'Springs' | 'Summer' | 'Fall' | string;
  season_year: string;
  rating: Rating;
  popularity: Popularity;
  date_begin: string;
  date_end: string;
  poster: Images | string;
  cover: Images | string;
  episode: Episode;
  type: 'TV' | 'Movie' | 'OAV' | 'ONA' | 'OVA' | 'special' | 'music' | string;
  status: 'finished' | 'current' | 'unreleased' | 'tba' | 'upcoming';
};

export type Animes = Array<Anime>;

export type Entry = {
  animeId: number;
  userId: number;
  status: EntryStatus;
  rating: number;
  progress: number;
  startedAt: Date | string;
  finishAt: Date | string;
  note: string;
  createAt: Date | string;
  updateAt: Date | string;
};

export type Entries = Array<Entry>;
