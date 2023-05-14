import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="bg-white mt-4 rounded-lg h-[450px] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-gray-800 hover:text-gray-900 transition-colors duration-300 ease-in-out">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center my-2">
          <Link to={`/product/${product._id}`}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#ff6863"}
            />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-800">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
