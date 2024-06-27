import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src='image.png' alt='logo' style={{height:"44px", width:"70px"}} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
