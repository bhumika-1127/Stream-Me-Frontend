import React, { useState } from 'react';
import Header from './parts/Header';
import Footer from './parts/Footer';
import './css/contact.css'; // Assuming you have your styles in this CSS file

const ContactForm = () => {
  // Define state for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'Name is required';
    if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      formErrors.email = 'Valid email is required: ex@abc.xyz';
    }
    if (!message) formErrors.message = 'Message is required';
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log({ name, email, message });
      // Add your form submission logic here
      alert('Form submitted successfully!');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='cont'>
    <Header />
    <div className="bg-contact100">
        <div className="wrap-contact100">
          <div className="contact100-pic js-tilt">
            <img src="src\assets\images mahanari project\pink-landline-wireline-home-phone-as-telephone-connection-vector-illustration-retro-vintage-telecommunication-device-278458414-removebg-preview.png" alt="IMG" />
          </div>
          <div>
          <form className="contact100-form validate-form" onSubmit={handleSubmit}>
            <span className="contact100-form-title">Get in touch</span>

            <div className={`wrap-input100 validate-input ${errors.name ? 'alert-validate' : ''}`} data-validate="Name is required">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          
            </div>

            <div className={`wrap-input100 validate-input ${errors.email ? 'alert-validate' : ''}`} data-validate="Valid email is required: ex@abc.xyz">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={`wrap-input100 validate-input ${errors.message ? 'alert-validate' : ''}`} data-validate="Message is required">
              <textarea
                className="input100"
                name="message"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span className="focus-input100"></span>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>

            <div className="container-contact100-form-btn">
              <button className="contact100-form-btn" type="submit">
                Send
              </button>
            </div>
          </form>
          </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ContactForm;
