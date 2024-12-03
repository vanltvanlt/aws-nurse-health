import { Container } from "react-bootstrap";
import Navbar from "./navbar";
import DailyInfoForm from "./DailyInfoForm";
import EmergencyAlert from "./EmergencyAlert";
import SymptomChecklist from "./SymptomChecklist";
import "../styles/Dashboard.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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
    }
  }
`;

export default function Dashboard() {
  const [currentAuthUser, setCurrentAuthUser] = useState(null);

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
    <>
      <Navbar currentAuthUser={currentAuthUser} />
      <Container className='mb-5'>
        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2 className='dashboad-title'>
            Welcome to the Sinai Hospital 🏥 Patient Portal
          </h2>
          <p>Daily Tip: {currentAuthUser?.name}</p>
        </div>

        {/* ************ DASHBOARD TILES ************ */}
        <div className='dashboard-container'>
          <div className='dashboard-left'>
            <div className='dashboard-tile dashboard-emergency-alert'>
              <h2 className='dashboad-title'>Emergency Alert</h2>
              <EmergencyAlert />
            </div>

            <div className='dashboard-tile dashboard-vitals'>
              <h2 className='dashboad-title'>Enter you Vitals</h2>
              <DailyInfoForm />
            </div>
          </div>

          <div className='dashboard-right'>
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
