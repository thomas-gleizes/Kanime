import React from "react";

export interface ContextProps {
  children: React.ReactNode;
}

export interface File {
  extension: string;
  data: string;
}

export interface ApiError {
  status: number;
  message?: string;
  data?: any;
}

export interface Images {
  tiny?: string;
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

export interface Saga {
  libelle: string;
  slug: string;
  created_at: Date;
  animes: Array<number>;
  cover: Images;
  poster: Images;
}
