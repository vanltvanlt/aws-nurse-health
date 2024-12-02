import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <Nav className='navbar navbar-expand-lg navbar-light bg-light mb-5'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Sinai Hospital 🏥 Nurse Portal
        </a>

        <div className='navbar-nav'>
          <a className='nav-link text'>Welcome, USER</a>
          <a className='nav-link logout-button' href='#'>
            Logout
          </a>
        </div>
      </div>
    </Nav>
  );
}
