import React from "react";
import { Link } from "react-router-dom";
import type { GitHubRepo } from "../types/types";

const RepoCard = React.memo(function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <>
      <div className="text-base space-y-2 p-5 border rounded-md">
        <Link to={repo.html_url} target="_blank" className="text-xl font-semibold underline hover:no-underline">
          {repo.name}
        </Link>
        <p>{repo.description}</p>
        <div>
          ⭐: {repo.stargazers_count} • Forks: {repo.forks_count}
        </div>
      </div>
    </>
  );
});

export default RepoCard;
