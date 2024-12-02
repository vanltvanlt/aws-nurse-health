import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/Dashboard.css";
import Dashboard from "./components/Dashboard";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4001/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
      {/* <Router>
        <div className='app-container'>
          <Routes>
            <Route path='/' element={<NurseDashboard />} />
            <Route path='/assign-patients' element={<AssignPatients />} />
            <Route path='/enter-vital-signs' element={<VitalsForm />} />
            <Route path='/clinical-visits' element={<ClinicalVisits />} />
            <Route path='/motivational-tips' element={<MotivationalTips />} />
          </Routes>
        </div>
      </Router> */}
    </ApolloProvider>
  );
}

export default App;
