/** authentification */

interface SignInResponse extends ApiResponse {
  user: User;
  token: string;
}

interface RegisterResponse extends ApiResponse {
  user: User;
  token: string;
}

interface RefreshUserResponse extends ApiResponse {
  user: User;
}

/** users */

interface ShowUsersListResponse extends ApiResponse {
  users: Users;
}

interface SearchUserResponse extends ApiResponse {
  users: Users;
}

interface ShowUserResponse extends ApiResponse {
  user: User;
}

interface UpdateUserResponse extends ApiResponse {
  user: User;
  token: string;
}

interface ShowUserEntriesResponse extends ApiResponse {
  entries: Entries;
}

interface ShowUserAnimesResponse extends ApiResponse {
  animes: Animes;
}

interface ShowUserFollowsResponse extends ApiResponse {
  follows: Users;
}

interface ShowUserFollowersResponse extends ApiResponse {
  followers: Users;
}

interface CreateFollowResponse extends ApiResponse {
  follow: any;
}

/** animes */

interface AnimesListResponse extends ApiResponseList<Animes> {}

interface AnimesSearchResponse extends ApiResponse {
  animes: Animes;
}

interface AnimeSlugResponse extends ApiResponse {
  anime: Anime;
}

interface AnimeUserResponse extends ApiResponse {
  users: Users;
}

interface ShowAnimeResponse extends ApiResponse {
  anime: Anime;
}

interface ShowAnimeCategoriesResponse extends ApiResponse {
  categories: Categories;
}

interface ShowAnimeEntriesResponse extends ApiResponse {
  entries: Entries;
}

/** entries */

interface ShowEntriesListResponse extends ApiResponse {
  entries: Entries;
}

interface CreateEntryResponse extends ApiResponse {
  entry: Entry;
}

interface ShowEntryResponse extends ApiResponse {
  entry: Entry;
}

interface UpdateEntryResponse extends ApiResponse {
  entry: Entry;
}

interface ShowEntryUserResponse extends ApiResponse {
  user: User;
}

/** sagas */

interface ShowSagasListResponse extends ApiResponse {
  sagas: Sagas;
}

interface SearchSagasResponse extends ApiResponse {
  sagas: Sagas;
}

interface ShowSagaResponse extends ApiResponse {
  saga: Saga;
}

/** common */

interface CountriesResponse extends ApiResponse {
  countries: Countries;
}

/** logs */
interface LogsResponse extends ApiResponseList<Logs> {}
