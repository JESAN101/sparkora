const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="Search jewelry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-4"
      />

    </div>
  );
};

export default SearchBar;