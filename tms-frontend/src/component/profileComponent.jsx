import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    profilePhoto: "",
  });

  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      setProfilePhotoPreview(storedUserData.profilePhoto);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhotoPreview(reader.result);
      setUserData({
        ...userData,
        profilePhoto: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Profile updated successfully!");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <h3>Profile</h3>
              </div>
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <img
                    src={profilePhotoPreview || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <Form.Group controlId="formProfilePhoto" className="mt-3">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
                  </Form.Group>
                </div>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4 w-100">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
