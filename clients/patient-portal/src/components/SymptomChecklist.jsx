import React, { useState } from 'react';
import { Form, Button, Checkbox } from 'react-bootstrap';

function SymptomChecklist() {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSymptoms(prev => checked ? [...prev, value] : prev.filter(symptom => symptom !== value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Checklist for Symptoms</h1>
            <div>
                <Form.Check label="Fever" value="Fever" onChange={handleCheckboxChange} />
                <Form.Check label="Cough" value="Cough" onChange={handleCheckboxChange} />
                <Form.Check label="Difficulty Breathing" value="Difficulty Breathing" onChange={handleCheckboxChange} />
                // Add more symptoms as needed
            </div>
            <Button type="submit">Submit Symptoms</Button>
        </Form>
    );
}

export default SymptomChecklist;
