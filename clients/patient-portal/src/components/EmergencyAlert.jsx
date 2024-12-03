import { Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

const ADD_ALERT_MUTATION = gql`
  mutation AddAlert($userId: String!) {
    addAlert ($userId: String){
      id
      createdAt
    }
  }
`;

export default function EmergencyAlert({ currentAuthUser }) {
  // Mutations
  const [addAlert] = useMutation(ADD_ALERT_MUTATION);

  // Add a new motivational tip
  const handleSendAlert = async (event) => {
    event.preventDefault();
    try {
      await addAlert();
      alert("Alert sent!");
    } catch (err) {
      alert("Error adding tip: " + err.message);
    }
  };

  return (
    <div>
      <Button onClick={handleSendAlert} className='button'>
        Send Alert
      </Button>
    </div>
  );
}

EmergencyAlert.propTypes = {
  currentAuthUser: PropTypes.object,
};
