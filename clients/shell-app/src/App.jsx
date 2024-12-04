import { useState, useEffect, lazy, Suspense } from "react";
import { useQuery, gql } from "@apollo/client";
import "./styles/index.css";
import Navbar from "./components/Navbar";

const AuthenticationApp = lazy(() => import("authenticationApp/App"));
const NursePortalApp = lazy(() => import("nursePortalApp/App"));
const PatientPortalApp = lazy(() => import("patientPortalApp/App"));

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // Use Apollo's useQuery hook to perform the authentication status check on app load
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // Listen for the custom loginSuccess event from the UserApp
    const handleLoginSuccess = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    // Check the authentication status based on the query's result
    if (!loading && !error) {
      setIsLoggedIn(!!data.currentUser);
      setRole(data.currentUser?.role);
    }

    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, [loading, error, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className='shell-app-container'>
      <Suspense fallback={<div>Loading...</div>}>
        {!isLoggedIn ? (
          <AuthenticationApp />
        ) : role === "patient" ? (
          <>
            <Navbar currentAuthUser={data.currentUser} />
            <PatientPortalApp />
          </>
        ) : (
          <>
            <Navbar currentAuthUser={data.currentUser} />
            <NursePortalApp />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
