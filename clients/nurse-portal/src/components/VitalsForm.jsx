import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function VitalsForm() {
    const [vitals, setVitals] = useState({
        temperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: ''
    });

    const handleChange = (event) => {
        setVitals({...vitals, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // add stuff
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Body Temperature</Form.Label>
                <Form.Control type="number" name="temperature" value={vitals.temperature} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Heart Rate</Form.Label>
                <Form.Control type="number" name="heartRate" value={vitals.heartRate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control type="text" name="bloodPressure" value={vitals.bloodPressure} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Respiratory Rate</Form.Label>
                <Form.Control type="number" name="respiratoryRate" value={vitals.respiratoryRate} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Submit Vitals</Button>
        </Form>
    );
}

export default VitalsForm;
