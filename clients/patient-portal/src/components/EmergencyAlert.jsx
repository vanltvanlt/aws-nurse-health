import { Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const ADD_ALERT_MUTATION = gql`
  mutation AddAlert {
    addAlert {
      id
      createdAt
    }
  }
`;

export default function EmergencyAlert() {
  // Mutations
  const [addAlert] = useMutation(ADD_ALERT_MUTATION);

  // Add a new motivational tip
  const handleSendAlert = async (event) => {
    event.preventDefault();
    try {
      await addAlert();
      alert("Alert sent!");
    } catch (err) {
      console.log(err);
      alert("Error adding Alert: " + err.message);
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
