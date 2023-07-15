import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { listProducts } from "../actions/productActions.js";

import Product from "../components/Product";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import { useGetProductsQuery } from "../services/productsApi.js";

const HomeScreen = () => {
  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products, page, pages } = productList;

  const { keyword = "", pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // useEffect(() => {
  //   dispatch(listProducts(keyword, pageNumber));
  // }, [dispatch, keyword, pageNumber]);

  return (
    <div className="container pb-20 pt-3">
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back{" "}
        </Link>
      )}
      <h1 className="mt-10 font-semibold">Latest products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {data.products.length === 0 ? (
              <Col>
                <Message>
                  <i className="far fa-times-circle"></i> Products not found
                </Message>
              </Col>
            ) : (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
          <div className="mt-10 flex justify-center">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : null}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
