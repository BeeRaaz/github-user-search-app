import SearchBar from "../components/SearchBar";
import useFetchUser from "../hooks/useFetchUser";

function HomePage() {
  const { search } = useFetchUser();

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>

        <SearchBar onSearch={search} />
      </div>
    </>
  );
}

export default HomePage;
