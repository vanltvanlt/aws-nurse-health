import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const AssignPatients = ({ selectedPatient }) => {
  return (
    <div>
      <Button
        className='button'
        onClick={
          //  handleAssign
          console.log("Assigning patient to nurse")
        }
        disabled={!selectedPatient}
      >
        Send Profile to Doctor
      </Button>
    </div>
  );
};

AssignPatients.propTypes = {
  selectedPatient: PropTypes.string.isRequired,
};

export default AssignPatients;
