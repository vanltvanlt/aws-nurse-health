import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VitalsForm from './components/VitalsForm.jsx';
import ClinicalVisits from './components/ClinicalVisits.jsx';
import MotivationalTips from './components/MotivationalTips.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/enter-vitals" component={VitalsForm} />
          <Route path="/clinical-visits" component={ClinicalVisits} />
          <Route path="/motivational-tips" component={MotivationalTips} />
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
