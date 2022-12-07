import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory, Route } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
  const [headerColor, setHeaderColor] = useState("#62B6B7");
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <header>
      <Navbar style={{backgroundColor: `${headerColor}`}} variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="logo"
                style={{ height: "18px" }}
                src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyLjAwOSA1MTIuMDA5IiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMi4wMDkgNTEyLjAwOSIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJtNDMyLjAwOCA0MGgtMTYyLjc1Yy0xMC42OCAwLTIwLjczIDQuMTYtMjguMjggMTEuNzJsLTIzMC4xNCAyMzAuMTRjLTE0LjQ1OCAxNC40NTgtMTQuNDQ0IDM3LjgzNiAwIDUyLjI4bDE2Ny4wMyAxNjcuMDNjMTQuNDU5IDE0LjQ1OCAzNy44MzYgMTQuNDQ0IDUyLjI4IDAgMTIwLjA2NC0xMjAuMDUxIDY3LjA0Ni02Ny4wMzMgMjMwLjE0LTIzMC4xNCA3LjU2LTcuNTYgMTEuNzItMTcuNiAxMS43Mi0yOC4yOHYtMTYyLjc1YzAtMjIuMDYtMTcuOTQtNDAtNDAtNDB6bS01NiAxMjhjLTE3LjY1IDAtMzItMTQuMzYtMzItMzJzMTQuMzUtMzIgMzItMzIgMzIgMTQuMzYgMzIgMzItMTQuMzUgMzItMzIgMzJ6IiBmaWxsPSIjNzljYjljIi8+PHBhdGggZD0ibTQzMi4wMDggNDBoLTQwYzIyLjA2IDAgNDAgMTcuOTQgNDAgNDB2MTYyLjc1YzAgMTAuNjgtNC4xNiAyMC43Mi0xMS43MiAyOC4yOC0yNDguNjkxIDI0OC43MS0yMzEuMTA4IDIzMS43NTItMjM2LjI4IDIzNS4wOTQgMTMuOTc0IDkuMDMgMzMuMzI3IDcuODU5IDQ2LjE0LTQuOTU0IDEyMC4wNjQtMTIwLjA1MSA2Ny4wNDYtNjcuMDMzIDIzMC4xNC0yMzAuMTQgNy41Ni03LjU2IDExLjcyLTE3LjYgMTEuNzItMjguMjh2LTE2Mi43NWMwLTIyLjA2LTE3Ljk0LTQwLTQwLTQweiIgZmlsbD0iIzYzYWM3ZCIvPjxwYXRoIGQ9Im0zNzYuMDA4IDE0NGMtNy4wNjQgMC0xMC43MTEtOC42MDItNS42NTctMTMuNjU3bDEyOC0xMjhjMy4xMjQtMy4xMjMgOC4xODktMy4xMjMgMTEuMzEzIDAgMy4xMjUgMy4xMjUgMy4xMjUgOC4xODkgMCAxMS4zMTRsLTEyOCAxMjhjLTEuNTYxIDEuNTYyLTMuNjA4IDIuMzQzLTUuNjU2IDIuMzQzeiIgZmlsbD0iI2YxY2M3NiIvPjwvZz48L3N2Zz4="
              />
              StackStore
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route
              render={({ history }) => (
                <SearchBox
                  history={history}
                  onChangeHeaderColor={setHeaderColor}
                />
              )}
            />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown id="username" title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown id="admin menu" title="ADMIN TOOLS">
                  <LinkContainer to="/admin/userslist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
