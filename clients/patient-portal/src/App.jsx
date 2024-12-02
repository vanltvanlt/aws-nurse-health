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
      <Container>
        <div className='dashboard-tile dashboard-header'>
          <h2>Welcome to the Sinai Hospital 🏥 Patient Portal</h2>
          <p>Daily Tip: </p>
        </div>

        <div className='dashboard-container'>
          <div className='dashboard-left'>
            <div className='dashboard-tile dashboard-vitals'>
              <h2>Enter you Vitals</h2>
              <DailyInfoForm />
            </div>
          </div>

          <div className='dashboard-right'>
            <div className='dashboard-tile dashboard-emergency-alert'>
              <h2>Emergency Alert</h2>
              <EmergencyAlert />
            </div>

            <div className='dashboard-tile dashboard-symptoms-checklist'>
              <h2>Checklist for Symptoms</h2>
              <SymptomChecklist />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
