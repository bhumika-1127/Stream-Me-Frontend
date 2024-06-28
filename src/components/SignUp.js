import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './parts/Header';
import Footer from './parts/Footer';
import axios from 'axios'; // Import Axios for making HTTP requests
import './css/signup.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${window.location.origin}/signup`, { name, email, password });
      if (response.status==201) {
        window.location.href = '/stream';
      } else {
        setError('Sign up failed');
      }
    } catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Container className="my-10">
          <div className="d-flex justify-content-center">
            <div className="form-signup w-100 m-auto" style={{ maxWidth: '330px' }}>
              <Form onSubmit={handleSignUp}>
                <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
                {error && <p className="text-danger">{error}</p>}
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    id="floatingName"
                    placeholder="Your Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingName">Name</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="email"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingEmail">Email address</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="floatingPassword"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingPassword">Password</Form.Label>
                </Form.Group>
                <Button className="btn btn-primary w-100 py-2" type="submit">
                  Sign up
                </Button>
                <p className="mt-3 mb-3 text-body-secondary">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </p>
              </Form>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
