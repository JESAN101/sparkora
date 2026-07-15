import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative mb-8">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe/50" size={14} />
      <input
        type="text"
        placeholder="Search jewelry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-line bg-white rounded-full pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-rose transition-colors"
      />
    </div>
  );
};

export default SearchBar;
