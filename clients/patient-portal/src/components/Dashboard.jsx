import { Container } from "react-bootstrap";
import Navbar from "./navbar";
import DailyInfoForm from "./DailyInfoForm";
import EmergencyAlert from "./EmergencyAlert";
import SymptomChecklist from "./SymptomChecklist";
import "../styles/Dashboard.css";
import { gql, useQuery } from "@apollo/client";

// GraphQL Queries
const GET_PATIENT_QUERY = gql`
  query GetPatient {
    getUser(id: $userId) {
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
    }
  }
`;

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const { data: loggedUser } = useQuery(GET_PATIENT_QUERY, {
    variables: { userId: userId },
  });

  return (
    <>
      <Navbar />
      <Container className='mb-5'>
        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2 className='dashboad-title'>
            Welcome to the Sinai Hospital 🏥 Patient Portal
          </h2>
          <p>Daily Tip: {loggedUser?.name}</p>
        </div>

        {/* ************ DASHBOARD TILES ************ */}
        <div className='dashboard-container'>
          <div className='dashboard-left'>
            <div className='dashboard-tile dashboard-vitals'>
              <h2 className='dashboad-title'>Enter you Vitals</h2>
              <DailyInfoForm />
            </div>
          </div>

          <div className='dashboard-right'>
            <div className='dashboard-tile dashboard-emergency-alert'>
              <h2 className='dashboad-title'>Emergency Alert</h2>
              <EmergencyAlert />
            </div>

            <div className='dashboard-tile dashboard-symptoms-checklist'>
              <h2 className='dashboad-title'>Checklist for Symptoms</h2>
              <SymptomChecklist />
            </div>
          </div>
        </div>
      </Container>
      <footer>Final Group Assignment &copy; 2024</footer>
    </>
  );
}
