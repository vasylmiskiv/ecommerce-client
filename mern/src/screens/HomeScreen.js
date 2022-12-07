import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { listProducts } from "../actions/productActions.js";

import Product from "../components/Product";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import Paginate from "../components/Paginate.js";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back{" "}
        </Link>
      )}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.length === 0 ? (
              <Col>
                <Message>
                  <i class="far fa-times-circle"></i> Products not found
                </Message>
              </Col>
            ) : (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : null}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
