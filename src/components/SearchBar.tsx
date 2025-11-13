import React, { useCallback, useState, type FormEvent } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const SearchBar = React.memo(function SearchBar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = term.trim();
      if (!trimmed) return;
      onSearch(trimmed);
      navigate(`/user/${encodeURIComponent(trimmed)}`);
    },
    [term, onSearch, navigate]
  );

  return (
    <>
      <form onSubmit={submitHandler} className="flex flex-wrap">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search User:
          </label>
          <input
            id="search"
            type="text"
            placeholder="John Doe"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="py-2 px-4 border focus:outline-0 w-full h-full"
          />
        </div>
        <Button type="submit" className="rounded-none!">Search</Button>
      </form>
    </>
  );
});

export default SearchBar;
