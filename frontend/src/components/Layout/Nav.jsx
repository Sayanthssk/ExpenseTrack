import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../Services/api";

function AppNavbar() {
  const navigate = useNavigate();

   const handleLogout = async () => {
      const success = await logout()
      if (success) {
          alert("Logout successful")
        navigate('/')
      }else{
          alert("Logout failed")
      }
    }
    
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
