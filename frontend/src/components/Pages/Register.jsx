import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../Services/api.js';
import { useAuth } from '../contexts/useAuth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const {register_user} = useAuth()

    const handleRegister = (e) => {
        e.preventDefault();
        register_user(username, email, password, Cpassword)
    }


    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={4}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary mb-2">Welcome to Expense Tracker</h2>
                                <p className="text-muted">Please enter your details to sign up.</p>
                            </div>

                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label className="fw-semibold">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        size="lg"
                                        className="bg-light border-0"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label className="fw-semibold">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Email"
                                        size="lg"
                                        className="bg-light border-0"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label className="fw-semibold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        size="lg"
                                        className="bg-light border-0"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your password"
                                        size="lg"
                                        className="bg-light border-0"
                                        onChange={(e) => setCpassword(e.target.value)}
                                        value={Cpassword}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" size="lg" type="submit" className="rounded-pill fw-bold shadow-sm" onClick={handleRegister}>
                                        Sign In
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="text-muted mb-0">
                                    Already have an account?{' '}
                                    <Link to="/" className="text-decoration-none fw-bold">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;