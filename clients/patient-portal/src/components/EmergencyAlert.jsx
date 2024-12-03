import { Button } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";

const ADD_ALERT_MUTATION = gql`
  mutation AddMotivationalTip($content: String!) {
    addMotivationalTip(content: $content) {
      id
      content
      createdAt
    }
  }
`;

export default function EmergencyAlert() {
  const handleAlert = () => {
    alert("Emergency alert sent!");
  };

  return (
    <div>
      <Button onClick={handleAlert} className='button'>
        Send Alert
      </Button>
    </div>
  );
}
