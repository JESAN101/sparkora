import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to="/shop"
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;