import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    emailAdd: '',
    comment: '',
  });

  const [formReset, setFormReset] = useState(false);

  useEffect(() => {
    if (formReset) {
      // Reset the form by setting formData to empty values
      setFormData({
        name: '',
        emailAdd: '',
        comment: '',
      });
      setFormReset(false);
    }
  }, [formReset]);

  const isValidEmail = (email) => {
    // Regular expression for a valid email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Check for common email domains
    const commonDomains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'icloud.com',
    ];
    const domain = email.split('@')[1];
    return commonDomains.includes(domain.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, emailAdd, comment } = formData;

    // Check if the email address is in a valid format
    if (!isValidEmail(emailAdd)) {
      toast.error('Please check your email before submitting', {
        className: 'error-toast',
      });
      return;
    }

    try {
      // If all fields and email are valid, send the data to the server
      await Axios.post('http://localhost:8000/NotionAPIPost', {
        Name: name,
        Email: emailAdd,
        Message: comment,
      });

      // Show a success toast notification
      toast.success('Form submitted successfully', {
        className: 'success-toast',
      });

      // Reset the form by setting formReset to true
      setFormReset(true);
    } catch (error) {
      // Handle server errors
      toast.error('Error submitting form', {
        className: 'error-toast',
      });
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="title">React Feedback Form</h1>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleInputChange}
            required
            value={formData.name}
          />
        </div>
        <div className="inputs">
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="emailAdd"
              placeholder="Enter you email"
              onChange={handleInputChange}
              required
              value={formData.emailAdd}
            />
          </div>
        </div>
        <div className="inputs">
          <div>
            <label htmlFor="feedback">Message</label>
            <input
              type="text"
              id="feedback"
              name="comment"
              placeholder="Your Message here."
              onChange={handleInputChange}
              required
              value={formData.comment}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
