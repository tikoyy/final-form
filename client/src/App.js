import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {
  const [name, setName] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [comment, setMessage] = useState("");
  const [formReset, setFormReset] = useState(false);

  useEffect(() => {
    if (formReset) {
      //Reset the form by setting variables to empty ones
      setName('');
      setEmailAdd('');
      setMessage('');
      setFormReset(false);
    }
  }, [formReset]);

  

  const isValidEmail = (emailAdd) => {
    // Regular expression for a valid email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(emailAdd)) {
      return false;
    }

    //Check for common email domains
    const commonDomain = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'icloud.com'
    ];
    const domain = emailAdd.split('@')[1]; //This is to extract the domain part of the email. 
    return commonDomain.includes(domain.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Check if the email address is in a valid format
    if (!isValidEmail(emailAdd)) {
      toast.error('Please check you email before submitting', { className: 'error-toast' });
      return;
    }

    try {
      // If all fields and email is valid, send the data to the server
      Axios.post('http://localhost:8000/NotionAPIPost', {
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

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='title'> React Feedback form </h1>
        <div>
          <label htmlFor='name'> Full Name </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => { setName(e.target.value) }}
            required
            value={name}
          />
        </div>
        <div className='inputs'>
          <div>
            <label htmlFor='email'> Email Address </label>
            <input
              type='email'
              placeholder="Email Address"
              onChange={(e) => { setEmailAdd(e.target.value) }}
              required
              value={emailAdd}
            />
          </div>
        </div>
        <div className='inputs'>
          <div>
            <label htmlFor='feedback'> Message </label>
            <input
              type='message'
              placeholder='Your Message here.'
              onChange={(e) => { setMessage(e.target.value) }}
              required
              value={comment}
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