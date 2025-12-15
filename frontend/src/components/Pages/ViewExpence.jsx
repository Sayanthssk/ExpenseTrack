// import React, { useEffect, useState } from 'react'
// import { getExpenses } from '../Services/api.js'
// import { Table } from 'react-bootstrap'

// function ViewExpence() {
//     const [expenses, setExpenses] = useState([])


//     useEffect(() => {
//         const fetchExpenses = async () => {
//             const expenses = await getExpenses()
//             setExpenses(expenses)
//         }
//         fetchExpenses()
//     }, [])


//     return (
//         <div>

//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Amount</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                         <th>Created At</th>
//                         <th>Updated At</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {expenses.map((expense) => (
//                         <tr key={expense.id}>
//                             <td>{expense.title}</td>
//                             <td>{expense.amount}</td>
//                             <td>{expense.category}</td>
//                             <td>{expense.date}</td>
//                             <td>{expense.created_at}</td>
//                             <td>{expense.updated_at}</td>
//                         </tr>
//                     ))}

//                 </tbody>
//             </Table>
//         </div>
//     )
// }

// export default ViewExpence


import React, { useEffect, useState } from "react";
import { getExpenses, logout } from "../Services/api.js";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewExpence() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleLogout = async () => {
    const success = await logout()
    if (success) {
        alert("Logout successful")
      navigate('/')
    }else{
        alert("Logout failed")
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Button className="btn btn-danger" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default ViewExpence;
