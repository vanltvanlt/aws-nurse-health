import PropTypes from "prop-types";

const AssignPatients = ({ selectedPatient }) => {
  console.log(selectedPatient);
  return (
    <div>
      <h3>List of Syptoms</h3>

      <h3>Risk Prediction</h3>
    </div>
  );
};

AssignPatients.propTypes = {
  selectedPatient: PropTypes.string.isRequired,
};

export default AssignPatients;
