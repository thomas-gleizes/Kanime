declare module 'next/app' {
  import type {
    GetServerSideProps,
    GetStaticPaths,
    GetStaticProps,
    NextApiRequest,
    NextApiResponse,
    NextPage,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextApiHandler,
  } from 'next';

  declare type Page<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: Component<{ children: ReactNode } & P>;
    // errors?: Component<P>;
  };

  declare type ApiHandler<T> = NextApiHandler<T>;

  declare type ServerSideProps<P = {}, Q = any, D = any> = GetServerSideProps<P, Q, D>;
  declare type StaticProps<T> = GetStaticProps<T>;
  declare type StaticPaths<T> = GetStaticPaths<T>;

  declare type ServerSidePropsContext<Q = {}, D = any> = GetServerSidePropsContext<Q, D>;
  declare type ServerSidePropsResult<P = {}> = GetServerSidePropsResult<P>;

  declare type ApiResponse<Data = {}> = NextApiResponse<
    (Data & DefaultResponseData) | ApiResponseError | ApiResponseSchemaError
  >;
  declare type ApiRequest<Body = any, Query = any> = NextApiRequest & {
    body: Body;
    query: Query;
  };

  interface AppProps {
    pageProps: any;
    Component: Page;
  }

  declare type SsrHandlerType<P = {}, Q = any> = (
    handler: (
      context: ServerSidePropsContext<Q>
    ) => OptionalPromise<GetServerSidePropsResult<P>>
  ) => ServerSideProps<P, Q>;
}

declare module 'prisma/app' {
  import type {
    Anime,
    Category,
    Country,
    Entry,
    Log,
    Prisma,
    Post,
    Saga,
    User,
    UserFollow,
    AnimeSeason,
    AnimeType,
    AnimeStatus,
    EntryStatus,
    Visibility,
    Gender,
    Method,
  } from '@prisma/client';

  declare type PrismaUser = User & PrismaUserRelations;
  declare type PrismaUsers = PrismaUser[];
  declare type PrismaUserRelations = {
    entries?: PrismaEntries;
    posts?: PrismaPosts;
    follows?: PrismaFollows;
    followers?: PrismaFollows;
    country?: PrismaCountry;
  };
  declare type PrismaUserInclude = Prisma.UserInclude;
  declare type PrismaUserDelegate = Prisma.UserDelegate<unknown>;

  declare type PrismaAnime = Anime & PrismaAnimeRelations;
  declare type PrismaAnimes = PrismaAnime[];
  declare type PrismaAnimeRelations = {
    entries?: PrismaEntries;
    posts?: PrismaPosts;
    saga?: PrismaSaga;
    categories?: PrismaCategories;
  };
  declare type PrismaAnimeInclude = Prisma.AnimeInclude;
  declare type PrismaAnimeDelegate = Prisma.AnimeDelegate<unknown>;

  declare type PrismaCategory = Category;
  declare type PrismaCategories = PrismaCategory[];
  declare type PrismaCategoryInclude = Prisma.CategoryInclude;
  declare type PrismaCategoryDelegate = Prisma.CategoryDelegate<unknown>;

  declare type PrismaEntry = Entry & PrismaEntryRelations;
  declare type PrismaEntries = PrismaEntry[];
  declare type PrismaEntryRelations = { anime?: PrismaAnime; user?: PrismaUser };
  declare type PrismaEntryInclude = Prisma.EntryInclude;
  declare type PrismaEntryDelegate = Prisma.EntryDelegate<unknown>;

  declare type PrismaSaga = Saga & PrismaSagaRelations;
  declare type PrismaSagas = PrismaSaga[];
  declare type PrismaSagaRelations = { animes?: PrismaAnimes };
  declare type PrismaSagaInclude = Prisma.SagaInclude;
  declare type PrismaSagaDelegate = Prisma.SagaDelegate<unknown>;

  declare type PrismaLog = Log & PrismaLogRelation;
  declare type PrismaLogs = PrismaLog[];
  declare type PrismaLogRelation = { user?: PrismaUser };
  declare type PrismaLogInclude = Prisma.LogInclude;
  declare type PrismaLogDelegate = Prisma.LogDelegate<unknown>;

  declare type PrismaFollow = UserFollow & PrismaFollowRelations;
  declare type PrismaFollows = PrismaFollow[];
  declare type PrismaFollowRelations = { follower?: PrismaUser; follow?: PrismaUser };
  declare type PrismaFollowInclude = Prisma.UserFollowInclude;
  declare type PrismaFollowDelegate = Prisma.UserFollowDelegate<unknown>;

  declare type PrismaCountry = Country & PrismaCountryRelations;
  declare type PrismaCountries = PrismaCountry[];
  declare type PrismaCountryRelations = { users?: PrismaUsers };
  declare type PrismaCountryInclude = Prisma.CountryInclude;
  declare type PrismaCountryDelegate = Prisma.CountryDelegate<unknown>;

  declare type PrismaPost = Post & PrismaPostRelations;
  declare type PrismaPosts = PrismaPost[];
  declare type PrismaPostRelations = {
    user?: PrismaUser;
    anime?: PrismaAnime;
    replyTo?: Post;
    replies?: PrismaPosts;
  };
  declare type PrismaPostInclude = Prisma.PostInclude;
  declare type PrismaPostsDelegate = Prisma.ReactionDelegate<unknown>;

  declare type PrismaAnimeSeason = AnimeSeason;
  declare type PrismaAnimeType = AnimeType;
  declare type PrismaAnimeStatus = AnimeStatus;
  declare type PrismaEntryStatus = EntryStatus;
  declare type PrismaVisibility = Visibility;
  declare type PrismaGender = Gender;
  declare type PrismaMethod = Method;
}

declare module 'sessions/app' {
  import { IronSession } from 'iron-session';

  declare type SessionData = {
    user: User;
    token: string;
  };

  declare type Session = IronSession & SessionData;
}
