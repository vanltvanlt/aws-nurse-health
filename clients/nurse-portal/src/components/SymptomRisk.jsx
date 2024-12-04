// import PropTypes from "prop-types";

// const AssignPatients = ({ selectedPatient }) => {
//   console.log(selectedPatient);
//   return (
//     <div>
//       <h3>List of Syptoms</h3>

//       <h3>Risk Prediction</h3>
//     </div>
//   );
// };

// AssignPatients.propTypes = {
//   selectedPatient: PropTypes.string.isRequired,
// };

// export default AssignPatients;
import React, { useEffect, useState } from "react";
import { getSymptomsRisk } from "../services/symptomsRiskService";

const SymptomsRisk = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptomsRisk = async () => {
      try {
        const predictions = await getSymptomsRisk();
        setData(predictions);
      } catch (err) {
        setError("Failed to load symptoms risk data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSymptomsRisk();
  }, []);

  if (loading) return <div>Loading symptoms risk...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="symptoms-risk-tile">
      <h3>Patient Symptoms & Risks</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Symptoms:</strong> {item.symptoms} <br />
            <strong>Risk:</strong> {item.risk}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomsRisk;