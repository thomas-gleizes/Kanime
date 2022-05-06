declare module 'app/next' {
  import type {
    GetServerSideProps,
    GetStaticPaths,
    GetStaticProps,
    NextApiRequest,
    NextApiResponse,
    NextPage,
  } from 'next';

  declare type Page<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: Component<{ children: NodeR } & P>;
  };

  declare type ServerSideProps<P = {}> = GetServerSideProps<T>;
  declare type StaticProps<T> = GetStaticProps<T>;
  declare type StaticPaths<T> = GetStaticPaths<T>;

  declare type ApiResponse<D = DefaultResponseData> = NextApiResponse<
    D | ApiResponseError | ApiResponseSchemaError
  >;
  declare type ApiRequest = NextApiRequest;

  interface AppProps {
    pageProps: any;
    Component: Page;
  }
}

declare module 'prisma/app' {
  import {
    Anime,
    Category,
    Country,
    Entry,
    Gender,
    Log,
    Prisma,
    Post,
    Saga,
    User,
    UserFollow,
    EntryStatus,
  } from '@prisma/client';

  declare type PrismaUser = User & {
    entries?: PrismaEntries;
    posts?: PrismaPosts;
    follows?: PrismaFollows;
    followers?: PrismaFollows;
    country?: PrismaCountry;
  };
  declare type PrismaUsers = PrismaUser[];
  declare type PrismaUserDelegate = Prisma.UserDelegate<unknown>;

  declare type PrismaAnime = Anime & {
    entries?: PrismaEntries;
    posts?: PrismaPosts;
    saga?: PrismaSaga;
    categories?: PrismaCategories;
  };
  declare type PrismaAnimes = PrismaAnime[];
  declare type PrismaAnimeDelegate = Prisma.AnimeDelegate<unknown>;

  declare type PrismaCategory = Category;
  declare type PrismaCategories = PrismaCategory[];
  declare type PrismaCategoryDelegate = Prisma.CategoryDelegate<unknown>;

  declare type PrismaEntry = Entry & { anime?: PrismaAnime; user?: PrismaUser };
  declare type PrismaEntries = PrismaEntry[];
  declare type PrismaEntryDelegate = Prisma.EntryDelegate<unknown>;

  declare type PrismaSaga = Saga & { animes?: PrismaAnimes };
  declare type PrismaSagas = PrismaSaga[];
  declare type PrismaSagaDelegate = Prisma.SagaDelegate<unknown>;

  declare type PrismaLog = Log & { user?: PrismaUser };
  declare type PrismaLogs = PrismaLog[];
  declare type PrismaLogDelegate = Prisma.LogDelegate<unknown>;

  declare type PrismaFollow = UserFollow & { follower?: PrismaUser; follow?: PrismaUser };
  declare type PrismaFollows = PrismaFollow[];
  declare type PrismaFollowDelegate = Prisma.UserFollowDelegate<unknown>;

  declare type PrismaCountry = Country & { users?: PrismaUsers };
  declare type PrismaCountries = PrismaCountry[];
  declare type PrismaCountryDelegate = Prisma.CountryDelegate<unknown>;

  declare type PrismaPost = Post & {
    user?: PrismaUser;
    anime?: PrismaAnime;
    replyTo?: Post;
    replies?: PrismaPosts;
  };
  declare type PrismaPosts = PrismaPost[];
  declare type PrismaPostsDelegate = Prisma.ReactionDelegate<unknown>;

  declare type PrismaGender = Gender;
  declare type PrismaEntryStatus = EntryStatus;
}
