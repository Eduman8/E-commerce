import React from "react";
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "react-bootstrap/Navbar";
import { LogoutButton } from "../Auth/LogoutButton";
import "./NavBar.css";
import Logo from "../../assets/images/navLogo.png"
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const allBilling = useSelector((state) => state.user);
  console.log(allBilling);


  return (
    <>
      <Navbar bg="success" fixed="top" variant="dark">
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand ><img src={Logo} alt="" className="navLogo" /></Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">

            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/shopping">
              <Nav.Link>Shopping</Nav.Link>
            </LinkContainer>


          </Nav>
            {allBilling?
            <LinkContainer to="/review">
              <div id="btnReview">Review</div>
            </LinkContainer>:null}
          <FavoriteButton></FavoriteButton>
          {isAuthenticated ? (
            <Link to="/user">
            <img className="navImg" src={user.picture} alt={"No"} />
            </Link>
          ) : (
            <img
              className="navImg"
              src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
              alt={"No"}
            />
          )}
          {isAuthenticated ? (
            <Link to="/user">
              {/* <> */}
            <h3 id="autentic">Hola {user.name}</h3>
            {/* </> */}
            </Link>
          ) : (
            <h3 id="autentic">Invited</h3>
          )}
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link to="/">
              <button type="button" className="btn btn-light">
                Login
              </button>
            </Link>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
