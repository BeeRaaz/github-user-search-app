import { useCallback } from "react";
import { useGitHub } from "../contexts/GitHubContext";

function useFetchUser() {
  const { state, fetchUserAndRepos, clear } = useGitHub();

  const search = useCallback(
    (username: string, page: number = 1) => {
      fetchUserAndRepos(username, 6, page);
    },
    [fetchUserAndRepos]
  );

  return { state, search, clear };
}

export default useFetchUser;
