import React from 'react';
import { Button } from 'react-bootstrap';

function EmergencyAlert() {
    const handleAlert = () => {
        alert("Emergency alert sent!");
    }

    return (
        <div>
            <h1>Emergency Alert</h1>
            <Button onClick={handleAlert}>Send Alert</Button>
        </div>
    );
}

export default EmergencyAlert;
