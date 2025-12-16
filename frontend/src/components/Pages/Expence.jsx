import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense } from '../Services/api.js'; // Ensure addExpense is exported
import { Table, Container, Button, Modal, Form, Card, Row, Col, Badge } from 'react-bootstrap';
import DashboardLayout from '../Layout/DashboardLayout';

function Expence() {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: ''
    });

    const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Other'];

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExpense(formData);
            setShowModal(false);
            setFormData({ title: '', amount: '', category: '', date: '' });
            fetchExpenses(); // Refresh list
        } catch (error) {
            console.error("Failed to add expense", error);
            alert("Failed to add expense");
        }
    };

    return (
        <DashboardLayout>
            <Container fluid>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="fw-bold text-primary mb-0">My Expenses</h2>
                        <p className="text-muted">Manage and track your daily spending</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" size="lg" className="rounded-pill shadow-sm" onClick={() => setShowModal(true)}>
                            + Add Expense
                        </Button>
                    </Col>
                </Row>

                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Body className="p-0">
                        <Table responsive hover className="mb-0 text-nowrap align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 ps-4 border-0">Title</th>
                                    <th className="py-3 border-0">Category</th>
                                    <th className="py-3 border-0">Date</th>
                                    <th className="py-3 border-0 text-end pe-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.length > 0 ? (
                                    expenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td className="ps-4 fw-semibold text-dark">{expense.title}</td>
                                            <td>
                                                <Badge bg="light" text="dark" className="border">
                                                    {expense.category}
                                                </Badge>
                                            </td>
                                            <td className="text-muted">{expense.date}</td>
                                            <td className="text-end pe-4 fw-bold text-danger">-${expense.amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">
                                            No expenses found. Add one to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Add Expense Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="fw-bold">Add New Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-4">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Lunch with friends"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Category</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" size="lg" type="submit" className="rounded-pill">
                                    Save Expense
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </DashboardLayout>
    );
}

export default Expence;
