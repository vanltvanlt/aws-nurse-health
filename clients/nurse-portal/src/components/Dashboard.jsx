import { useState, useEffect } from "react";
import { Form, Spinner, Alert, Container } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import MotivationalTips from "./MotivationalTips";
import ClinicalVisits from "./ClinicalVisits";
import VitalsForm from "./VitalsForm";
import SymptomRisk from "./SymptomRisk";
import AlertPopup from "./AlertPopup";

// GraphQL query to check the current user's authentication status
const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      role
      vitalSigns {
        id
        bodyTemperature
        heartRate
        bloodPressure
        respiratoryRate
        date
      }
      symptomsRiskPrediction
      symptoms
    }
  }
`;

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
  const [focus, setFocus] = useState("Dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentAuthUser, setCurrentAuthUser] = useState(null);

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

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // Check the authentication status based on the query's result
    if (!loading && !error) {
      setCurrentAuthUser(data.currentUser);
    }
  }, [loading, error, data]);

  return (
    <div>
      <Container className='mb-5'>
        {/* ************ POPUP MOTIVATIONAL TIPS ************ */}
        {focus == "Tips" && (
          <div>
            <div
              className='dashboard-tips-overlay'
              onClick={() => setFocus("Dashboard")}
            ></div>
            <div className='dashboard-tips-popup'>
              <div
                className='close-button'
                onClick={() => setFocus("Dashboard")}
              >
                Close
              </div>
              <h2 className='dashboad-title'>Motivational Tips</h2>
              <MotivationalTips />
            </div>
          </div>
        )}

        {/* ************ POPUP MOTIVATIONAL TIPS ************ */}
        {focus == "Alert" && (
          <div>
            <div
              className='dashboard-tips-overlay'
              onClick={() => setFocus("Dashboard")}
            ></div>
            <div className='dashboard-tips-popup'>
              <div
                className='close-button'
                onClick={() => setFocus("Dashboard")}
              >
                Close
              </div>
              <h2 className='dashboad-title'>Emergency Alerts</h2>
              <AlertPopup />
            </div>
          </div>
        )}

        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2 className='dashboad-title'>
            🩺 Nurse Portal{" "}
            {currentAuthUser?.name ? "- Welcome " + currentAuthUser?.name : ""}
          </h2>
          <a className='link' href='#' onClick={() => setFocus("Tips")}>
            Manage Motivational Tips
          </a>
          <a className='link' href='#' onClick={() => setFocus("Alert")}>
            View Alerts
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
                {patientsData?.listUsers.map((patient) => (
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
                <VitalsForm selectedPatient={selectedPatient} />
              </div>

              <div className='dashboard-tile dashboard-emergency-alert'>
                <h2 className='dashboad-title'>
                  Latest Symptom Checklist Details
                </h2>
                <SymptomRisk selectedPatient={selectedPatient} />
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
