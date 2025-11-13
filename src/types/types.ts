export interface GitHubUser {
  login: string;
  name?: string;
  bio?: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubState {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loadingUser: boolean;
  loadingRepos: boolean;
  error: string | null;
  totalRepos: number;
  cachedUsers: Record<string, { user: GitHubUser; repos: GitHubRepo[] }>;
}

export type GitHubAction =
  | { type: "FETCH_USER_START" }
  | { type: "FETCH_REPOS_START" }
  | {
      type: "FETCH_USER_SUCCESS";
      payload: { user: GitHubUser; repos: GitHubRepo[] };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "CLEAR" };

export interface GitHubContextType {
  state: GitHubState;
  fetchUserAndRepos: (
    username: string,
    per_page?: number,
    page?: number
  ) => Promise<void>;
  clear: () => void;
}
