import { Button } from "react-bootstrap";

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
