import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  type GitHubContextType,
  type GitHubAction,
  type GitHubState,
} from "../types/types";

const GitHubContext = createContext<GitHubContextType | null>(null);

const initialState: GitHubState = {
  user: null,
  repos: [],
  loadingUser: false,
  loadingRepos: false,
  error: null,
  totalRepos: 0,
  cachedUsers: {},
};

function reducer(state: GitHubState, action: GitHubAction) {
  switch (action.type) {
    case "FETCH_USER_START":
      return { ...state, loadingUser: true, error: null };
    case "FETCH_REPOS_START":
      return { ...state, loadingRepos: true };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loadingUser: false,
        loadingRepos: false,
        user: action.payload.user,
        repos: action.payload.repos,
        totalRepos: action.payload.user.public_repos,
        cachedUsers: {
          ...state.cachedUsers,
          [action.payload.user.login.toLowerCase()]: {
            user: action.payload.user,
            repos: action.payload.repos,
          },
        },
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR":
      return { ...state, user: null, repos: [], error: null };
    default:
      return state;
  }
}

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUserAndRepos = useCallback(
    async (username: string, per_page = 6, page = 1) => {
      if (!username) return;
      const key = username.toLowerCase();

      // Only use cache for the user data, not repos (since they're paginated)
      if (state.cachedUsers[key]) {
        dispatch({ type: "FETCH_REPOS_START" });
        try {
          const reposResponse = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            { params: { per_page, page, sort: "updated" } }
          );
          
          dispatch({
            type: "FETCH_USER_SUCCESS",
            payload: { user: state.cachedUsers[key].user, repos: reposResponse.data },
          });
          return;
        } catch (error) {
          console.log(error);
        }
      }

      dispatch({ type: "FETCH_USER_START" });
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );

        // fetch repos(paginated)
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          { params: { per_page, page, sort: "updated" } }
        );

        dispatch({
          type: "FETCH_USER_SUCCESS",
          payload: { user: userResponse.data, repos: reposResponse.data },
        });
      } catch (error) {
        console.log(error);
        // const message =
        //   error?.status === 404 ? "User not found" : "Network Error";
        // dispatch({ type: "FETCH_ERROR", payload: message });
      }
    },
    [state.cachedUsers]
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo(
    () => ({ state, fetchUserAndRepos, clear }),
    [state, fetchUserAndRepos, clear]
  );

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
}

export const useGitHub = (): GitHubContextType => {
  const context = useContext(GitHubContext);
  if (!context)
    throw new Error("useGitHub must be used within a GitHubProvider");
  return context;
};
