import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Form, Table, Spinner, Alert } from "react-bootstrap";

// GraphQL Queries
const GET_PATIENTS_QUERY = gql`
  query GetPatients {
    listUsers(role: "patient") {
      id
      name
    }
  }
`;

const GET_PATIENT_VITAL_SIGNS_QUERY = gql`
  query GetPatientVitalSigns($userId: ID!) {
    getUser(id: $userId) {
      vitalSigns {
        id
        bodyTemperature
        heartRate
        bloodPressure
        respiratoryRate
        date
      }
    }
  }
`;

function ClinicalVisits() {
  const [selectedPatient, setSelectedPatient] = useState("");

  // Fetch list of patients
  const {
    loading: patientsLoading,
    error: patientsError,
    data: patientsData,
  } = useQuery(GET_PATIENTS_QUERY);

  // Fetch vital signs for selected patient
  const {
    loading: vitalsLoading,
    error: vitalsError,
    data: vitalsData,
  } = useQuery(GET_PATIENT_VITAL_SIGNS_QUERY, {
    variables: { userId: selectedPatient },
    skip: !selectedPatient, // Skip query if no patient is selected
  });

  // Handle patient selection
  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  return (
    <div>
      {/* Patient Selector */}
      {patientsLoading ? (
        <Spinner animation='border' />
      ) : patientsError ? (
        <Alert variant='danger'>
          Error loading patients: {patientsError.message}
        </Alert>
      ) : (
        <Form.Group>
          <Form.Label>Select Patient</Form.Label>
          <Form.Control
            as='select'
            value={selectedPatient}
            onChange={handlePatientChange}
          >
            <option value=''>Select a patient</option>
            {patientsData.listUsers.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      )}

      {/* Vital Signs Table */}
      {vitalsLoading ? (
        <Spinner animation='border' />
      ) : vitalsError ? (
        <Alert variant='danger'>
          Error loading vital signs: {vitalsError.message}
        </Alert>
      ) : selectedPatient &&
        vitalsData &&
        vitalsData.getUser.vitalSigns.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Body Temperature</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>Respiratory Rate</th>
            </tr>
          </thead>
          <tbody>
            {vitalsData.getUser.vitalSigns.map((vital) => (
              <tr key={vital.id}>
                <td>{new Date(parseInt(vital.date)).toLocaleString()}</td>
                <td>{vital.bodyTemperature} °C</td>
                <td>{vital.heartRate} bpm</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.respiratoryRate} breaths/min</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        selectedPatient && (
          <p>No clinical visits found for the selected patient.</p>
        )
      )}
    </div>
  );
}

export default ClinicalVisits;
