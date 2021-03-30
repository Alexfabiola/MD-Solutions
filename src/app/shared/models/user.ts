import { Movie } from "./movie";

export class User {
  key?: string;
  id: string;
  name: string;
  last_name: string;
  movies: Movie[];
}
