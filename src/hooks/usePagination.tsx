import { useCallback, useState } from "react";

function usePagination() {
  const [page, setPage] = useState(1);

  const next = useCallback(() => setPage((p) => p + 1), []);
  const prev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  return { page, next, prev };
}

export default usePagination;
