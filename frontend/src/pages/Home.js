import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRegistering ? "Registering User" : "Logging in", formData);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Logo */}
      <img src="/logo.jpeg" alt="BookSwap Logo" className="mb-4" style={{ width: "100px" }} />

      {/* Form Card */}
      <Card style={{ width: "22rem" }} className="p-4 shadow">
        <Card.Title className="text-center mb-3">
          {isRegistering ? "Register" : "Login"}
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          {/* Name Field (Only for Registration) */}
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

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            {isRegistering ? "Sign Up" : "Login"}
          </Button>
        </Form>

        {/* Toggle Between Login/Register */}
        <div className="text-center mt-3">
          <small>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login" : "Sign Up"}
            </Button>
          </small>
        </div>
      </Card>
    </Container>
  );
}
