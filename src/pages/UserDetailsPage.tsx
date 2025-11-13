import { Link, useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import usePagination from "../hooks/usePagination";
import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import RepoCard from "../components/RepoCard";
import Pagination from "../components/Pagination";

function UserDetailsPage() {
  const { username } = useParams();
  const decoded = decodeURIComponent(username || "");
  const { state, search } = useFetchUser();
  const { page, next, prev } = usePagination();

  useEffect(() => {
    if (decoded) {
      search(decoded, page);
    }
  }, [decoded]); // Only run when username changes

  // Separate effect for pagination
  useEffect(() => {
    if (state.user && page > 1) {
      search(state.user.login, page);
    }
  }, [page]); // Only run when page changes and we have a user

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User: {decoded}</h1>
        <Link to="/">Home</Link>
      </header>

      <ErrorMessage message={state.error} />

      {state.loadingUser ? (
        <Loader />
      ) : state.user ? (
        <div className="space-y-4 py-5 md:flex md:flex-wrap">
          <div className="md:w-1/3">
            <UserCard user={state.user} />
          </div>
          {state.loadingRepos ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : state.repos.length === 0 ? (
            <h2>No Repositories found</h2>
          ) : (
            <>
              <div className="md:flex-1 md:ps-5">
                <h2 className="text-3xl font-bold tracking-tighter mb-3">
                  Repositories (page {page})
                  <span className="text-sm text-gray-600 tracking-normal font-normal block">
                    Showing {state.repos.length} repos
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-5">
                  {state.repos.map((r) => (
                    <RepoCard key={r.id} repo={r} />
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Pagination
                    page={page}
                    next={next}
                    prev={prev}
                    isPrevDisabled={page === 1}
                    isNextDisabled={
                      state.repos.length < 6 || page * 6 >= state.totalRepos
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserDetailsPage;
