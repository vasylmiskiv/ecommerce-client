import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Spinner
        animation="grow"
        role="status"
        style={{ width: "80px", height: "80px" }}
      ></Spinner>
    </div>
  );
};

export default Loader;
