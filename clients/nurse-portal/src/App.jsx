import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import VitalsForm from './components/VitalsForm.jsx';
import ClinicalVisits from './components/ClinicalVisits.jsx';
import MotivationalTips from './components/MotivationalTips.jsx';
import NurseDashboard from './components/NurseDashboard.jsx';
import AssignPatients from './components/AssignPatient.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<NurseDashboard />} />
            <Route path="/assign-patients" element={<AssignPatients />} />
            <Route path="/enter-vital-signs" element={<VitalsForm />} />
            <Route path="/clinical-visits" element={<ClinicalVisits />} />
            <Route path="/motivational-tips" element={<MotivationalTips />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;