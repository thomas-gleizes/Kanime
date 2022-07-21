/** authentication */

interface SignInResponse extends DefaultResponseData {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

/** users */

interface UsersEntriesResponse {
  entries: Entries;
}

/** animes */

interface AnimesListResponse {
  animes: Animes;
}

interface AnimesSearchResponse {
  animes: Animes;
}

interface AnimeSlugResponse {
  anime: Anime;
}

interface AnimeUserResponse {
  users: Users;
}

interface AnimeResponse {
  anime: Anime;
}

interface AnimeCategories {
  categories: Categories;
}

interface AnimeEntry {
  entry: Entry;
}
