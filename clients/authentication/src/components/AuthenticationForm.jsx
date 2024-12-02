import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import "../styles/AuthenticationForm.css";
import { gql, useMutation } from "@apollo/client";

// GraphQL Mutations
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      role
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    register(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

function AuthenticationForm() {
  // STATES
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("nurse");

  const [activeTab, setActiveTab] = useState("login");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOGIN MUTATION
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const token = data.login.token; // Extract token from response
      localStorage.setItem("authToken", token); // Store token in local storage
      console.log("Token: ", token);
      console.log("data: ", data);

      // Dispatch custom event upon successful login
      if (data.login.role === "nurse") {
        window.dispatchEvent(
          new CustomEvent("auth-Success", { detail: { token } }),

          // Redirect to dashboard
          window.location.assign("http://localhost:3002/")
        );
      } else {
        window.dispatchEvent(
          new CustomEvent("auth-Success", { detail: { token } }),

          // Redirect to dashboard
          window.location.assign("http://localhost:5173/")
        );
      }
    },

    onError: (error) => setAuthError(error.message || "Login failed"),
  });

  // REGISTER MUTATION
  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      login({ variables: { email, password } });
    },
    onError: (error) => setAuthError(error.message || "Registration failed"),
  });

  // FORM HANDLERS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    if (!email || !password) {
      setAuthError("email and password are required.");
      setIsSubmitting(false);
      return;
    }

    if (activeTab === "login") {
      await login({ variables: { email, password } });
    } else {
      await register({ variables: { name, email, password, role } });
    }

    setIsSubmitting(false);
  };

  // Layout Base Model from https://mdbootstrap.com/docs/standard/extended/login/
  return (
    <>
      <section className='section-auth'>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col col-xl-10'>
              <div className='card card-auth'>
                <div className='row g-0'>
                  {/* IMAGE */}
                  <div className='col-md-6 col-lg-5 d-none d-md-block'>
                    <img
                      src='/auth-image.webp'
                      alt='authentication form'
                      className='img-fluid image-auth'
                    />
                  </div>

                  {/* FORM */}
                  <div className='col-md-6 col-lg-6 d-flex align-items-top'>
                    <div className='card-body p-2 p-lg-5 text-black'></div>
                    <Container className='p-2'>
                      <h1 className='mb-5 mt-5'>Portal</h1>
                      <Row className='justify-content-md-center'>
                        <Col>
                          {/* <Card>
                            <Card.Header> */}
                          <Nav
                            variant='tabs'
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                          >
                            <Nav.Item>
                              <Nav.Link eventKey='login'>Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                            </Nav.Item>
                          </Nav>
                          {/* </Card.Header>
                            <Card.Body> */}

                          {/* If event type is Sigup show name and role drop down to select nurse or patient */}
                          {activeTab === "signup" && (
                            <>
                              <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Enter your name'
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </Form.Group>

                              <Form.Group className='mb-3'>
                                <Form.Label>Role</Form.Label>

                                <Form.Select
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                >
                                  <option value='nurse'>Nurse</option>
                                  <option value='patient'>Patient</option>
                                </Form.Select>
                              </Form.Group>
                            </>
                          )}

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3 mt-3'>
                              <Form.Label>email</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </Form.Group>

                            {authError && (
                              <Alert variant='danger'>{authError}</Alert>
                            )}

                            <Button
                              variant='primary'
                              type='submit'
                              disabled={isSubmitting}
                              className='w-100'
                            >
                              {isSubmitting ? (
                                <Spinner
                                  as='span'
                                  animation='border'
                                  size='sm'
                                  role='status'
                                  aria-hidden='true'
                                />
                              ) : activeTab === "login" ? (
                                "Login"
                              ) : (
                                "Sign Up"
                              )}
                            </Button>
                          </Form>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthenticationForm;
