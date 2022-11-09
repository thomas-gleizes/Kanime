declare module 'app/types' {
  import { SsrException } from 'exceptions'

  declare type LayoutProps<Props = undefined> = {
    exception?: Undefinedable<SsrException>
    children: ReactNode
    pageProps: Props
  }

  declare type LayoutContentComponent<Props = undefined> = Component<
    Props & { children: ReactNode }
  >
}

declare module 'app/next' {
  import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticPaths,
    GetStaticProps,
    NextApiHandler,
    NextApiRequest,
    NextApiResponse,
    NextPage
  } from 'next'
  import { LayoutProps } from 'app/types'

  declare type Page<Props = {}, Layout extends LayoutProps = LayoutProps> = NextPage<
    Props,
    Props
  > & {
    layout?: Component<Layout<Props>>
  }

  declare type ApiHandler<T> = NextApiHandler<T>

  declare type ServerSideProps<P = {}, Q = any, D = any> = GetServerSideProps<P, Q, D>
  declare type StaticProps<T> = GetStaticProps<T>
  declare type StaticPaths<T> = GetStaticPaths<T>

  declare type ServerSidePropsContext<Q = {}, D = any> = GetServerSidePropsContext<Q, D>
  declare type ServerSidePropsResult<P = {}> = GetServerSidePropsResult<P>

  declare type ApiResponse<Data = {}> = NextApiResponse<
    (Data & DefaultResponseData) | ApiResponseError | ApiResponseSchemaError
  >
  declare type ApiRequest<Body = any, Query = any> = NextApiRequest & {
    body: Body
    query: Query
  }

  declare type AppProps = {
    pageProps: any
    Component: Page
    session: any
  }

  declare type initialState = {
    session: User
  }

  declare type SsrHandlerType<P = {}, Q = any> = (
    handler: (
      context: ServerSidePropsContext<Q>
    ) => OptionalPromise<GetServerSidePropsResult<P>>
  ) => ServerSideProps<P, Q>
}

declare module 'app/prisma' {
  import type {
    Anime,
    AnimeSeason,
    AnimeStatus,
    AnimeType,
    Category,
    Country,
    Entry,
    EntryStatus,
    Gender,
    Log,
    Method,
    Post,
    Prisma,
    Saga,
    User,
    UserFollow,
    Visibility
  } from '@prisma/client'

  declare type PrismaUser = User & PrismaUserRelations
  declare type PrismaUsers = PrismaUser[]
  declare type PrismaUserRelations = {
    entries?: PrismaEntries
    posts?: PrismaPosts
    follows?: PrismaFollows
    followers?: PrismaFollows
    country?: PrismaCountry
  }
  declare type PrismaUserInclude = Prisma.UserInclude
  declare type PrismaUserDelegate = Prisma.UserDelegate<unknown>

  declare type PrismaAnime = Anime & PrismaAnimeRelations
  declare type PrismaAnimes = PrismaAnime[]
  declare type PrismaAnimeRelations = {
    entries?: PrismaEntries
    posts?: PrismaPosts
    saga?: PrismaSaga
    categories?: PrismaCategories
  }
  declare type PrismaAnimeInclude = Prisma.AnimeInclude
  declare type PrismaAnimeDelegate = Prisma.AnimeDelegate<unknown>

  declare type PrismaCategory = Category
  declare type PrismaCategories = PrismaCategory[]
  declare type PrismaCategoryInclude = Prisma.CategoryInclude
  declare type PrismaCategoryDelegate = Prisma.CategoryDelegate<unknown>

  declare type PrismaEntry = Entry & PrismaEntryRelations
  declare type PrismaEntries = PrismaEntry[]
  declare type PrismaEntryRelations = { anime?: PrismaAnime; user?: PrismaUser }
  declare type PrismaEntryInclude = Prisma.EntryInclude
  declare type PrismaEntryDelegate = Prisma.EntryDelegate<unknown>

  declare type PrismaSaga = Saga & PrismaSagaRelations
  declare type PrismaSagas = PrismaSaga[]
  declare type PrismaSagaRelations = { animes?: PrismaAnimes }
  declare type PrismaSagaInclude = Prisma.SagaInclude
  declare type PrismaSagaDelegate = Prisma.SagaDelegate<unknown>

  declare type PrismaLog = Log & PrismaLogRelation
  declare type PrismaLogs = PrismaLog[]
  declare type PrismaLogRelation = { user?: Nullable<PrismaUser> }
  declare type PrismaLogInclude = Prisma.LogInclude
  declare type PrismaLogDelegate = Prisma.LogDelegate<unknown>

  declare type PrismaFollow = UserFollow & PrismaFollowRelations
  declare type PrismaFollows = PrismaFollow[]
  declare type PrismaFollowRelations = { follower?: PrismaUser; follow?: PrismaUser }
  declare type PrismaFollowInclude = Prisma.UserFollowInclude
  declare type PrismaFollowDelegate = Prisma.UserFollowDelegate<unknown>

  declare type PrismaCountry = Country & PrismaCountryRelations
  declare type PrismaCountries = PrismaCountry[]
  declare type PrismaCountryRelations = { users?: PrismaUsers }
  declare type PrismaCountryInclude = Prisma.CountryInclude
  declare type PrismaCountryDelegate = Prisma.CountryDelegate<unknown>

  declare type PrismaPost = Post & PrismaPostRelations
  declare type PrismaPosts = PrismaPost[]
  declare type PrismaPostRelations = {
    user?: PrismaUser
    anime?: PrismaAnime
    replyTo?: Post
    replies?: PrismaPosts
  }
  declare type PrismaPostInclude = Prisma.PostInclude
  declare type PrismaPostsDelegate = Prisma.ReactionDelegate<unknown>

  declare type PrismaAnimeSeason = AnimeSeason
  declare type PrismaAnimeType = AnimeType
  declare type PrismaAnimeStatus = AnimeStatus
  declare type PrismaEntryStatus = EntryStatus
  declare type PrismaVisibility = Visibility
  declare type PrismaGender = Gender
  declare type PrismaMethod = Method
}

declare module 'app/session' {
  import { IronSession } from 'iron-session'

  declare type Session = IronSession
}
