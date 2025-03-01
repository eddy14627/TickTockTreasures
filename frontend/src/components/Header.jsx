import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";
import { resetFilters } from "../slices/filterSlice";
import { clearCartItems, saveCartItems } from "../slices/cartSlice";
import { useGetCartItemsApiQuery } from "../slices/cartApiSlice";
import { cartItemsFormatter } from "../utils/cartUtils";
import Swal from "sweetalert2";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const { data: initialCartItems } = useGetCartItemsApiQuery(
    userInfo ? userInfo._id : ""
  );

  // Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(clearCartItems());
    if (initialCartItems && userInfo) {
      const formattedData = cartItemsFormatter(initialCartItems);
      dispatch(saveCartItems(formattedData));
    }
  }, [initialCartItems, dispatch, userInfo]);

  // Logout function with confirmation
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        dispatch(resetFilters());
        dispatch(clearCartItems());
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Highlight active menu
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header style={{ position: "sticky", top: "0", zIndex: "100" }}>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand-hover">
              <img src={logo} alt="TickTockTreasure" />
              TickTockTreasure
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/shop">
                <Nav.Link className={`nav-link ${isActive("/shop")}`}>
                  <BsShop /> Shop
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className={`nav-link ${isActive("/cart")}`}>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" className="cart-badge">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className={`nav-link ${isActive("/login")}`}>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Additional Styling */}
      <style>
        {`
          .brand-hover:hover {
            transform: scale(1.05);
            transition: all 0.3s ease-in-out;
          }

          .nav-link {
            font-weight: 500;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .nav-link:hover, .nav-link.active {
            color: #ff9800 !important;
            transform: scale(1.1);
          }

          .cart-badge {
            margin-left: 5px;
            animation: pulse 0.6s ease-in-out infinite alternate;
          }

          @keyframes pulse {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
