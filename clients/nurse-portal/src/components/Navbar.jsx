import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { gql, useMutation } from "@apollo/client";
import "../styles/Navbar.css";
import PropTypes from "prop-types";

const LOGOUT_USER_MUTATION = gql`
  mutation {
    logout
  }
`;

export default function Navbar({ currentAuthUser }) {
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
          Sinai Hospital 🏥 
        </a>

        <div className='navbar-nav'>
          <a className='nav-link non-selectable nav-welcome'>
            Welcome, {currentAuthUser?.name}
          </a>
          <a
            className='nav-link non-selectable nav-button'
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

Navbar.propTypes = {
  currentAuthUser: PropTypes.object,
};
