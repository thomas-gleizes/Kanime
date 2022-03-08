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

  declare type ServerSideProps<T> = GetServerSideProps<T>;
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
    Saga,
    User,
    UserFollow,
  } from '@prisma/client';

  declare type PrismaUser = User;
  declare type PrismaUsers = User[];
  declare type PrismaUserDelegate = Prisma.UserDelegate<unknown>;

  declare type PrismaAnime = Anime;
  declare type PrismaAnimes = Anime[];
  declare type PrismaAnimeDelegate = Prisma.AnimeDelegate<unknown>;

  declare type PrismaCategory = Category;
  declare type PrismaCategories = Category[];
  declare type PrismaCategoryDelegate = Prisma.CategoryDelegate<unknown>;

  declare type PrismaEntry = Entry;
  declare type PrismaEntries = Entry[];
  declare type PrismaEntryDelegate = Prisma.EntryDelegate<unknown>;

  declare type PrismaSaga = Saga;
  declare type PrismaSagas = Saga[];
  declare type PrismaSagaDelegate = Prisma.SagaDelegate<unknown>;

  declare type PrismaLog = Log;
  declare type PrismaLogs = Log[];
  declare type PrismaLogDelegate = Prisma.LogDelegate<unknown>;

  declare type PrismaFollow = UserFollow;
  declare type PrismaFollows = UserFollow[];
  declare type PrismaFollowDelegate = Prisma.UserFollowDelegate<unknown>;

  declare type PrismaCountry = Country;
  declare type PrismaCountries = Country[];
  declare type PrismaCountryDelegate = Prisma.CountryDelegate<unknown>;

  declare type PrismaGender = Gender;
}
