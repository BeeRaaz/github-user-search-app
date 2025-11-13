import React from "react";
import type { GitHubUser } from "../types/types";

const UserCard = React.memo(function UserCard({ user }: { user: GitHubUser }) {
  if (!user) return null;
  return (
    <>
      <div className="space-y-3">
        <div>
          <img src={user.avatar_url} alt="avatar" className="rounded-full" />
        </div>
        <div className="text-xl">
          <h2 className="text-3xl font-bold tracking-tight">{user.name || user.login}</h2>
          <p>{user.bio}</p>
          <div className="text-base md:text-xl">
            Repos: {user.public_repos} • Followers: {user.followers} •
            Following: {user.following}
          </div>
        </div>
      </div>
    </>
  );
});

export default UserCard;
