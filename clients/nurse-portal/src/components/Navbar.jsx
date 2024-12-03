import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { gql, useMutation } from "@apollo/client";

const LOGOUT_USER_MUTATION = gql`
  mutation {
    logout
  }
`;

export default function Navbar() {
  const [logout] = useMutation(LOGOUT_USER_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      if (data.logout) {
        // Reload the page after logout
        window.location.reload();
      }
    },
  });

  return (
    <Nav className='navbar navbar-expand-lg navbar-light bg-light mb-5'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Sinai Hospital 🏥 Nurse Portal
        </a>

        <div className='navbar-nav'>
          <a className='nav-link text'>Welcome, USER</a>
          <a
            className='nav-link logout-button'
            onClick={() => {
              logout();
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </Nav>
  );
}
