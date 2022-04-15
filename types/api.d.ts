/** authentication */

interface SignInResponse extends DefaultResponseData {
  user: User;
  token: string;
}

interface RegisterResponse extends DefaultResponseData {
  user: User;
  token: string;
}

/** animes */

interface AnimesListResponse extends DefaultResponseData {
  animes: Animes;
}

interface AnimesSearchResponse extends DefaultResponseData {
  animes: Animes;
}

interface AnimeSlugResponse extends DefaultResponseData {
  anime: Anime;
}

interface AnimeUserResponse extends DefaultResponseData {
  users: Users;
}

interface AnimeResponse extends DefaultResponseData {
  anime?: Anime;
  animes?: Animes;
}

interface AnimeCategories extends DefaultResponseData {
  categories: Categories;
}

interface AnimeEntry extends DefaultResponseData {
  entry: Entry;
}
