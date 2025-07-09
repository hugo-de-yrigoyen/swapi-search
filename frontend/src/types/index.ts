export interface SearchResult {
  id: string;
  name: string;
  type: 'people' | 'starships' | 'planets' | 'films' | 'species' | 'vehicles';
  data: any;
  url: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  query: string;
}

export interface AuthUser {
  username: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface ApiError {
  error: string;
}