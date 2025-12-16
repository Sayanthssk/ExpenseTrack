import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Nav className="flex-column bg-light vh-100 p-3">
      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/view-expence">Expenses</Nav.Link>
    </Nav>
  );
}

export default Sidebar;
