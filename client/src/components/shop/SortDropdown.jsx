const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="card-luxury p-6">
      <h2 className="font-display text-lg font-medium text-charcoal mb-4">
        Sort By
      </h2>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full border border-line rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-rose transition-colors"
      >
        <option>Latest</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Highest Rated</option>
      </select>
    </div>
  );
};

export default SortDropdown;
