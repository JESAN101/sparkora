import { useMemo, useState } from "react";

import products from "../data/products";

import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortDropdown from "../components/shop/SortDropdown";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    // Sorting
    switch (sort) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;

      case "Price: High to Low":
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;

      case "Highest Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return filtered;
  }, [search, category, sort]);

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Shop Jewelry
          </h1>

          <p className="text-gray-500 mt-3">
            Explore our luxury collection.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          <div>

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <CategoryFilter
              category={category}
              setCategory={setCategory}
            />

            <SortDropdown
              sort={sort}
              setSort={setSort}
            />

          </div>

          <div className="lg:col-span-3">

            <ProductGrid
              products={filteredProducts}
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Shop;