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
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch list of patients
  const {
    loading: patientsLoading,
    error: patientsError,
    data: patientsData,
  } = useQuery(GET_PATIENTS_QUERY);

  const handlePatientChange = (e) => {
    setSelectedPatient({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
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
              <div
                className='close-button'
                onClick={() => setShowTips(!showTips)}
              >
                Close
              </div>
              <h2 className='dashboad-title'>Motivational Tips</h2>
              <MotivationalTips />
            </div>
          </div>
        )}

        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2 className='dashboad-title'>
            Welcome to the Sinai Hospital 🏥 Nurse Portal
          </h2>
          <a className='link' href='#' onClick={() => setShowTips(!showTips)}>
            Motivational Tips
          </a>
        </div>

        {/* ************ PATIENT SEARCH ************ */}
        <div className='dashboard-header'>
          {/* Patient Selector */}
          {patientsLoading ? (
            <Spinner animation='border' />
          ) : patientsError ? (
            <Alert variant='danger'>
              Error loading patients: {patientsError.message}
            </Alert>
          ) : (
            <Form.Group>
              <Form.Control
                as='select'
                value={selectedPatient?.id}
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
                <h2 className='dashboad-title'>Clinical Records</h2>
                <ClinicalVisits selectedPatient={selectedPatient} />
              </div>
            </div>

            <div className='dashboard-right'>
              <div className='dashboard-tile dashboard-vitals'>
                <h2 className='dashboad-title'>Add Vitals</h2>
                <VitalsForm />
              </div>

              <div className='dashboard-tile dashboard-emergency-alert'>
                <h2 className='dashboad-title'>
                  Latest Symptom Checklist Details
                </h2>
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
