import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isRegistering) {
  //     // Registration API call
  //     try {
  //       const response = await axios.post("http://localhost:5003/api/auth/register", formData);
  //       console.log("Registration successful:", response.data);
  //       setMessage("Registration successful! Please log in.");
  //       // Optionally, switch to login view after successful registration
  //       setIsRegistering(false);
  //     } catch (error) {
  //       console.error("Registration error:", error.response?.data || error.message);
  //       setMessage("Registration failed: " + (error.response?.data?.error || error.message));
  //     }
  //   } else {
  //     // For now, simply log login form data
  //     navigate("/book");
  //     console.log("Login form submitted", formData);
  //     setMessage("Login functionality not yet implemented.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isRegistering) {
      if (!formData.name || !formData.email || !formData.password) {
        setMessage("All fields are required.");
        return;
      }
  
      if (formData.password.length < 6) {
        setMessage("Password must be at least 6 characters long.");
        return;
      }
  
      // Registration API call
      try {
        const response = await axios.post("http://localhost:5003/api/auth/register", formData);
        console.log("Registration successful:", response.data);
        setMessage("Registration successful! Please log in.");
        setIsRegistering(false);
      } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        setMessage("Registration failed: " + (error.response?.data?.error || error.message));
      }
    } else {
      // **🚀 Login API call (Fixed)**
      try {
        const response = await axios.post("http://localhost:5003/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
  
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token); // Save token
        setMessage("Login successful!");
        navigate("/book"); // Redirect to books page
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setMessage("Login failed: " + (error.response?.data?.error || error.message));
      }
    }
  };
  

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Logo */}
      <img src="/BookSwapLogo.png" alt="BookSwap Logo" className="mb-4" style={{ width: "100px" }} />

      {/* Form Card */}
      <Card style={{ width: "22rem" }} className="p-4 shadow">
        <Card.Title className="text-center mb-3">
          {isRegistering ? "Register" : "Login"}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          {isRegistering && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            {isRegistering ? "Sign Up" : "Login"}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <small>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button variant="link" className="p-0" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Login" : "Sign Up"}
            </Button>
          </small>
        </div>
        {message && <p className="mt-2 text-center">{message}</p>}
      </Card>
    </Container>
  );
}
