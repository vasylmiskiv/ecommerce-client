import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { createProduct } from "../actions/productActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { productLogin, productDetails, productCreate } = useAppSelector(
    (state) => ({
      productLogin: state.userLogin,
      productDetails: state.productDetails,
      productCreate: state.productCreate,
    })
  );

  const { userInfo } = productLogin;
  const { loading, error } = productDetails;

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      history.push("/admin/productlist");
    }
  }, [history, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProduct({
        name,
        price,
        brand,
        image,
        category,
        description,
        countInStock,
        _id: userInfo._id,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    setUploading(true);

    try {
      const responseImgBb = await axios.post(
        `${import.meta.env.VITE_IMGBB_API}/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imageUrl = responseImgBb.data.data.url;
      setImage(imageUrl);

      setUploading(false);
    } catch (error) {
      throw new Error("Failed to create hero");
    }
  };

  return (
    <div className="container">
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Create product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Col md={3}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price < 0 ? 0 : price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="count in stock">
                <Form.Label>Count in stock</Form.Label>
                <Form.Control
                  type="number"
                  value={countInStock < 0 ? 0 : countInStock}
                  onChange={(e) => setCountInStock(parseInt(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </Col>

            {/* <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="or choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group> */}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductCreateScreen;
