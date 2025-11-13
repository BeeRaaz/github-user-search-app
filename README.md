# GitHub User Search App

  A small **React + TypeScript + Vite** project that demonstrates searching GitHub users, viewing user details and repositories, and client-side pagination. This project was created for learning and practice.

  ## Features

  - Search GitHub users by username
  - View user profile details and a list of public repositories
  - Client-side pagination for results
  - Simple, hooks-based architecture and context for state

  ## Tech Stack

  - React + TypeScript
  - Vite (development server and build)
  - pnpm for package management (works with npm/yarn too)

  ## Notes:

  - The app uses the public GitHub API. Unauthenticated requests have low rate limits — if you hit rate limits, consider adding a personal access token to requests or test less frequently.

  ## Development notes

  - Components are in `src/components/` and pages in `src/pages/`.
  - `GitHubContext` centralizes fetching and caching logic — look there to modify API calls.
  - `useFetchUser` contains the main fetch logic for user details and repos.

  ## Enhancements / TODO (ideas)

  - Add GitHub API authentication (personal access token) to increase rate limits
  - Improve error handling and empty-state UIs
  - Add unit/integration tests for hooks and components
  - Add screenshots and badges to this README
