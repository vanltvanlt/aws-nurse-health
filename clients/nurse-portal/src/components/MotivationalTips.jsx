import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MotivationalTips() {
    const [tip, setTip] = useState("");

    const handleChange = (event) => {
        setTip(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // send tip to patients
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Enter Motivational Tip</Form.Label>
                <Form.Control as="textarea" rows={3} value={tip} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Send Tip</Button>
        </Form>
    );
}

export default MotivationalTips;
