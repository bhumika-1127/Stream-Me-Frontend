import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './parts/Header';
import Footer from './parts/Footer';
import axios from 'axios'; // Import Axios for making HTTP requests
import './css/signin.css'; // Import the CSS file for styling

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${window.location.origin}/signin`, { email, password });
      if (response.data.user) {
        window.location.href = '/stream';
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error signing in');
    }
  };

  return (
    <div>
      <Header />
      <div className='content'>
        <Container>
          <div className="d-flex justify-content-center">
            <div className="form-signin w-100 m-auto" style={{ maxWidth: '330px' }}>
              <Form onSubmit={handleSignIn}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="email"
                    id="floatingInput"
                    placeholder="name@example.com"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingInput">Email address</Form.Label>
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
                  Sign in
                </Button>
                {error && <p className="text-danger mt-3">{error}</p>}
                <p className="mt-3 mb-3 text-body-secondary">
                  New user? <Link to="/signup">Sign up</Link>
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

export default SignIn;


