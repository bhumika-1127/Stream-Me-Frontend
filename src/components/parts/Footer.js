import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-light py-3 my-4 border-top mb-0">
      <Container className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <a href="/" className="me-2 text-body-secondary text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
          </a>
          <span className="text-body-secondary">© 2024 STREAM ME</span>
        </div>

        <ul className="nav justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
