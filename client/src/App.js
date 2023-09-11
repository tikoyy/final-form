import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  // State for form data and form reset
  const [formData, setFormData] = useState({
    name: "",
    emailAdd: "",
    comment: "",
  });
  const [formReset, setFormReset] = useState(false);

  // Effect to reset the form when formReset state changes
  useEffect(() => {
    if (formReset) {
      // Reset the form by setting formData to empty values
      setFormData({
        name: "",
        emailAdd: "",
        comment: "",
      });
      setFormReset(false);
    }
  }, [formReset]);

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "icloud.com",
      "trajector.com",
      "trajectorservices.com"
    ];
    const domain = email.split("@")[1];
    return commonDomains.includes(domain.toLowerCase());
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, emailAdd, comment } = formData;

    // Check if the email address is in a valid format
    if (!isValidEmail(emailAdd)) {
      toast.error("Please check your email before submitting", {
        className: "error-toast",
      });
      return;
    }

    try {
      // If all fields and email are valid, send the data to the server using Axios
      await Axios.post("http://localhost:8000/NotionAPIPost", {
        Name: name,
        Email: emailAdd,
        Message: comment,
      });

      // Show a success toast notification
      toast.success("Form submitted successfully", {
        className: "success-toast",
      });

      // Reset the form by setting formReset to true
      setFormReset(true);
    } catch (error) {
      // Handle server errors and display an error toast
      toast.error("Error submitting form", {
        className: "error-toast",
      });
      console.error(error);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in the formData state
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
              placeholder="Enter your email"
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
      <ToastContainer /> {/* Container for displaying toast notifications */}
    </div>
  );
}

export default App;
