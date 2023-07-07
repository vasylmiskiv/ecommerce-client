import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="h-[500px] relative flex flex-col mt-4 overflow-hidden shadow-lg">
      <Link to={`/product/${product._id}`} className="text-black">
        <div className="w-full h-[200px] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform transform scale-100 opacity-90 hover:opacity-100 duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="h-full flex flex-col justify-between py-4 px-6">
        <div>
          <Link
            to={`/product/${product._id}`}
            className="text-lg text-black no-underline "
          >
            <div className="transition-all duration-200 hover:text-green-500 truncate">
              {product.name}
            </div>
          </Link>
          <Link
            to={`/product/${product._id}`}
            className="flex items-center mt-2 text-black no-underline hover:underline"
          >
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Link>
          <p className="mt-4 text-justify">
            {product.description.substring(0, 110)}...
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-black">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
