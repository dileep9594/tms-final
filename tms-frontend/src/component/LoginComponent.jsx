import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/tasks.css";
import { loginApi, saveLoggedUser, storeBasicAuth } from "../service/AuthApiService";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleLoginForm(event) {
    event.preventDefault();

    if (validateForm()) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));

      if (storedUserData) {
        const decodedPassword = atob(storedUserData.password);
        
        if (storedUserData.email === email && decodedPassword === password) {
          const basicAuth = "Basic " + btoa(email + ":" + password);
          const role = storedUserData.role || "user"; 
          
          storeBasicAuth(basicAuth);
          saveLoggedUser(storedUserData.id, email, role);
          
          navigate(`/tasks`);
        } else {
          setErrors({ email: "", password: "Invalid email or password" });
        }
      } else {
        setErrors({ email: "", password: "User not found" });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (!email.trim()) {
      errorsCopy.email = "Email required";
      valid = false;
    } else if (!isValidEmail(email)) {
      errorsCopy.email = "Invalid email address";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
    setErrors(errorsCopy);

    return valid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img src="/src/assets/loginPage.jpg" alt="Login Page" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div className="login-form bg-light shadow-lg p-4">
              <h2 className="mb-4 text-center">Login</h2>
              <form onSubmit={handleLoginForm}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-dark btn-block">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginComponent;
