import { useState } from "react";
import Navbar from "./Navbar";
import { Form, Spinner, Alert, Container } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import MotivationalTips from "./MotivationalTips";
import ClinicalVisits from "./ClinicalVisits";
import VitalsForm from "./VitalsForm";
import AssignPatients from "./AssignPatient";

// GraphQL Queries
const GET_PATIENTS_QUERY = gql`
  query GetPatients {
    listUsers(role: "patient") {
      id
      name
    }
  }
`;

export default function Dashboard() {
  const [showTips, setShowTips] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(1);

  // Fetch list of patients
  const {
    loading: patientsLoading,
    error: patientsError,
    data: patientsData,
  } = useQuery(GET_PATIENTS_QUERY);

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Container className='mb-5'>
        {/* ************ POPUP MOTIVATIONAL TIPS ************ */}
        {showTips && (
          <div>
            <div
              className='dashboard-tips-overlay'
              onClick={() => setShowTips(!showTips)}
            ></div>
            <div className='dashboard-tips-popup'>
              <div onClick={() => setShowTips(!showTips)}>Close</div>
              <h2>Motivational Tips</h2>
              <MotivationalTips />
            </div>
          </div>
        )}

        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2>Welcome to the Sinai Hospital 🏥 Nurse Portal</h2>
          <a href='#' onClick={() => setShowTips(!showTips)}>
            {" "}
            Motivational Tips
          </a>
        </div>

        {/* ************ PATIENT SEARCH ************ */}
        <div className='dashboard-tile dashboard-header'>
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
        </div>

        {/* ************ DASHBOARD TILES ************ */}
        {selectedPatient && (
          <div className='dashboard-container'>
            <div className='dashboard-left'>
              <div className='dashboard-tile dashboard-vitals'>
                <h2>Clinical Records</h2>
                <ClinicalVisits />
              </div>
            </div>

            <div className='dashboard-right'>
              <div className='dashboard-tile dashboard-vitals'>
                <h2>Add Vitals</h2>
                <VitalsForm />
              </div>
              <div className='dashboard-tile dashboard-emergency-alert'>
                <h2>Assign to Doctor</h2>
                <AssignPatients />
              </div>
            </div>
          </div>
        )}
      </Container>

      {selectedPatient ? (
        <footer>Final Group Assignment &copy; 2024</footer>
      ) : (
        <footer className='fixed-footer'>
          Final Group Assignment &copy; 2024
        </footer>
      )}
    </div>
  );
}
