import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 card"
      style={{height: '360px'}}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="bottom" style={{height: '160px'}}/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={{ color: "#3f3f3f" }}>
            <div>{product.name}</div>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Link to={`/product/${product._id}`}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#ff6863"}
            />
          </Link>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
