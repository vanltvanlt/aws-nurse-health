import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

const ADD_VITAL_SIGN_MUTATION = gql`
  mutation AddVitalSign(
    $userId: ID!
    $bodyTemperature: Float!
    $heartRate: Int!
    $bloodPressure: String!
    $respiratoryRate: Int!
    $bodyWeight: Float!
  ) {
    addVitalSign(
      userId: $userId
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
      bodyWeight: $bodyWeight
    ) {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      bodyWeight
      date
    }
  }
`;

function VitalsForm({ selectedPatient }) {
  const [vitals, setVitals] = useState({
    temperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: "",
    bodyWeight: "",
  });

  // Mutation to add vital signs
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN_MUTATION);

  const handleChange = (event) => {
    setVitals({ ...vitals, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }

    try {
      await addVitalSign({
        variables: {
          userId: selectedPatient.id,
          bodyTemperature: parseFloat(vitals.temperature),
          heartRate: parseInt(vitals.heartRate, 10),
          bloodPressure: vitals.bloodPressure,
          respiratoryRate: parseInt(vitals.respiratoryRate, 10),
          bodyWeight: parseFloat(vitals.bodyWeight),
        },
      });
      alert("Vital signs added successfully!");
    } catch (err) {
      alert("Error adding vital signs: " + err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Body Temperature</Form.Label>
        <Form.Control
          type='number'
          name='temperature'
          value={vitals.temperature}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Heart Rate</Form.Label>
        <Form.Control
          type='number'
          name='heartRate'
          value={vitals.heartRate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className='mt-3'>Blood Pressure</Form.Label>
        <Form.Control
          type='text'
          name='bloodPressure'
          value={vitals.bloodPressure}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label className='mt-3'>Respiratory Rate</Form.Label>
        <Form.Control
          type='number'
          name='respiratoryRate'
          value={vitals.respiratoryRate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className='mt-3'>Weight (kg)</Form.Label>
        <Form.Control
          type='number'
          name='bodyWeight'
          value={vitals.bodyWeight}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type='submit'>Submit Vitals</Button>
    </Form>
  );
}
VitalsForm.propTypes = {
  selectedPatient: PropTypes.object.isRequired,
};

export default VitalsForm;
