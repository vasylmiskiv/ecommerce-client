import React, { useState, useRef } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const SearchBox = ({ history, onChangeHeaderColor }) => {
  const [keyword, setKeyword] = useState("");

  const colorPickerRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="d-flex justify-content-between">
      <>
        <Col>
          <Form.Control
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search product..."
            className=""
          ></Form.Control>
        </Col>
      </>

      <Button type="submit" variant="success" className="px-5 mx-2">
        Search
      </Button>

      <Form.Control
        type="color"
        id="exampleColorInput"
        defaultValue="#563d7c"
        title="Choose your color"
        ref={colorPickerRef}
        onChange={() => onChangeHeaderColor(colorPickerRef.current.value)}
      />
    </Form>
  );
};

export default SearchBox;
