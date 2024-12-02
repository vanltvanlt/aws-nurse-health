import { Button } from "react-bootstrap";

export default function EmergencyAlert() {
  const handleAlert = () => {
    alert("Emergency alert sent!");
  };

  return (
    <div>
      <Button onClick={handleAlert}>Send Alert</Button>
    </div>
  );
}
