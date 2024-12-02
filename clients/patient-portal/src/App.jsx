import DailyInfoForm from "./components/DailyInfoForm";
import EmergencyAlert from "./components/EmergencyAlert";
import Navbar from "./components/navbar";
import SymptomChecklist from "./components/SymptomChecklist";
import { Container } from "react-bootstrap";
import "./styles/App.css";
import "./styles/Dashboard.css";

function App() {
  return (
    <>
      <Navbar />
      <Container className='mb-5'>
        {/* ************ HEADER ************ */}
        <div className='dashboard-tile dashboard-header'>
          <h2 className='dashboad-title'>
            Welcome to the Sinai Hospital 🏥 Patient Portal
          </h2>
          <p>Daily Tip: </p>
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

export default App;
