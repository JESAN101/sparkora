const SortDropdown = ({
  sort,
  setSort,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5">
        Sort By
      </h2>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="w-full border rounded-lg p-3"
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