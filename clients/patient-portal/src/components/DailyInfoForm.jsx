import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function DailyInfoForm() {
  const [info, setInfo] = useState({
    pulseRate: "",
    bloodPressure: "",
    weight: "",
    temperature: "",
    respiratoryRate: "",
  });

  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Pulse Rate</Form.Label>
        <Form.Control
          type='number'
          name='pulseRate'
          value={info.pulseRate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Blood Pressure</Form.Label>
        <Form.Control
          type='text'
          name='bloodPressure'
          value={info.bloodPressure}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type='number'
          name='weight'
          value={info.weight}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          type='number'
          name='temperature'
          value={info.temperature}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Respiratory Rate</Form.Label>
        <Form.Control
          type='number'
          name='respiratoryRate'
          value={info.respiratoryRate}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type='submit'>Submit Information</Button>
    </Form>
  );
}

export default DailyInfoForm;
