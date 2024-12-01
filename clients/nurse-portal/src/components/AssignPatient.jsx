import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Spinner, Alert, Form, Button } from "react-bootstrap";

// Fetch Unassigned Patients
const GET_UNASSIGNED_PATIENTS = gql`
  query {
    listUsers(role: "patient") {
      id
      name
      assignedNurse {
        id
      }
    }
  }
`;

// Assign Patient Mutation
const ASSIGN_PATIENT_MUTATION = gql`
  mutation AssignPatientToNurse($patientId: ID!, $nurseId: ID!) {
    assignPatientToNurse(patientId: $patientId, nurseId: $nurseId) {
      id
      name
    }
  }
`;

const AssignPatients = ({ nurseId }) => {
  const { loading, error, data } = useQuery(GET_UNASSIGNED_PATIENTS);
  const [assignPatient] = useMutation(ASSIGN_PATIENT_MUTATION);
  const [selectedPatient, setSelectedPatient] = useState("");

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  const unassignedPatients = data.listUsers.filter(
    (patient) => !patient.assignedNurse
  );

  const handleAssign = async () => {
    try {
      await assignPatient({
        variables: { patientId: selectedPatient, nurseId },
      });
      alert("Patient assigned successfully!");
    } catch (error) {
      alert("Error assigning patient: " + error.message);
    }
  };

  return (
    <div>
      <h3>Assign a Patient</h3>
      <Form.Group>
        <Form.Label>Select Patient</Form.Label>
        <Form.Select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">Select a patient</option>
          {unassignedPatients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button onClick={handleAssign} disabled={!selectedPatient}>
        Assign
      </Button>
    </div>
  );
};

export default AssignPatients;