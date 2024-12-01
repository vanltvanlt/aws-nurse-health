import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";
import { gql } from "@apollo/client";

// GraphQL Query to Fetch Nurse's Assigned Patients
const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      role
      assignedPatients {
        id
        name
      }
    }
  }
`;

const NurseDashboard = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  const nurse = data.currentUser;
  console.log(nurse);

  return (
    <div>
      <h1>Welcome, {nurse.name}</h1>
      <h3>Your Assigned Patients:</h3>
      <ul>
        {nurse.assignedPatients.length === 0 ? (
          <p>No patients assigned yet.</p>
        ) : (
          nurse.assignedPatients.map((patient) => (
            <li key={patient.id}>{patient.name}</li>
          ))
        )}
      </ul>

      <Button as={Link} to="/assign-patients">
        Assign Patients
      </Button>
      <Button as={Link} to="/enter-vital-signs">
        Enter Vital Signs
      </Button>
      <Button as={Link} to="/clinical-visits">
        View Patient History
      </Button>
      <Button as={Link} to="/motivational-tips">
        Send Motivational Tips
      </Button>
    </div>
  );
};

export default NurseDashboard;