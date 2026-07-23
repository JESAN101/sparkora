import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../services/productService";
import { normalizeProduct } from "../utils/normalizeProduct";

import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortDropdown from "../components/shop/SortDropdown";
import ProductGrid from "../components/shop/ProductGrid";
import { getCategories } from "../api/adminApi";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("Default");
  const [categories, setCategories] = useState([]);

   useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setSort(searchParams.get("sort") || "Default");
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products.map(normalizeProduct));
      } catch (err) {
        setError("Failed to load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(
        data.categories.filter((cat) => cat.isActive)
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchCategories();
}, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

 switch (sort) {
  case "Latest":
    filtered = filtered.filter(
      (product) => product.newArrival === true
    );
    break;

  case "Price: Low to High":
    filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    break;

  case "Price: High to Low":
    filtered.sort((a, b) => b.discountPrice - a.discountPrice);
    break;

  case "Highest Rated":
    filtered.sort((a, b) => b.rating - a.rating);
    break;

  case "Default":
  default:
    break;
}

    return filtered;
  }, [products, search, category, sort]);

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal">
            Shop Jewelry
          </h1>
          <p className="text-taupe mt-3">Explore our luxury collection.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <SearchBar search={search} setSearch={setSearch} />
            <CategoryFilter
    category={category}
    setCategory={setCategory}
    categories={categories}
/>
            <SortDropdown sort={sort} setSort={setSort} />
          </div>

          <div className="lg:col-span-3">
            {loading && <p className="text-taupe">Loading products...</p>}
            {error && <p className="text-burgundy">{error}</p>}
            {!loading && !error && (
              <>
                <p className="text-sm text-taupe mb-6">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "piece" : "pieces"}
                </p>
                <ProductGrid products={filteredProducts} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;