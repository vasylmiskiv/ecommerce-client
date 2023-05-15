import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";

import { listProducts, deleteProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { productList, userLogin, productDelete, productCreate } =
    useAppSelector((state) => ({
      productList: state.productList,
      userLogin: state.userLogin,
      productDelete: state.productDelete,
      productCreate: state.productCreate,
    }));

  const { loading, error, products, page, pages } = productList;
  const { userInfo } = userLogin;
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
    product: deletedProduct,
  } = productDelete;
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleleteHandler = (id) => {
    if (window.confirm("Do u confirm it?")) {
      dispatch(deleteProduct(id));
    }
  };

  // const createProductHandler = () => {
  //   dispatch(createProduct());
  // };

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="mt-4 text-3xl font-semibold">Products</h1>

        <Link
          to={`/admin/product/create`}
          className="mt-2 flex items-center bg-green-500 py-2 px-4 no-underline text-white hover:bg-green-600 rounded-lg duration-200"
        >
          <AiOutlinePlus />
          <div>Create a product</div>
        </Link>
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>

      {loadingDelete && loadingCreate && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && (
        <Message variant="primary">{deletedProduct.message}</Message>
      )}

      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {successCreate && (
        <Message variant="primary">{createdProduct.message}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="mt-3.5 overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-zinc-600 text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Tools</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product._id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">{product.brand}</td>
                  <td className="border px-4 py-2">
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-1 rounded-md">
                        <i className="fas fa-edit"></i>
                      </button>
                    </LinkContainer>

                    <button
                      className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md ml-2"
                      onClick={() => {
                        deleleteHandler(product._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
