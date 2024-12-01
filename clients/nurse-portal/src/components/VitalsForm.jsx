import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL Queries and Mutations
const GET_PATIENTS_QUERY = gql`
  query GetPatients {
    listUsers(role: "patient") {
      id
      name
    }
  }
`;

const ADD_VITAL_SIGN_MUTATION = gql`
  mutation AddVitalSign(
    $userId: ID!
    $bodyTemperature: Float!
    $heartRate: Int!
    $bloodPressure: String!
    $respiratoryRate: Int!
  ) {
    addVitalSign(
      userId: $userId
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
    ) {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      date
    }
  }
`;

function VitalsForm() {
  const [vitals, setVitals] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
  });
  const [selectedPatient, setSelectedPatient] = useState('');

  // Fetch patients
  const { loading, error, data } = useQuery(GET_PATIENTS_QUERY);

  // Mutation to add vital signs
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN_MUTATION);

  const handleChange = (event) => {
    setVitals({ ...vitals, [event.target.name]: event.target.value });
  };

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPatient) {
      alert('Please select a patient');
      return;
    }

    try {
      await addVitalSign({
        variables: {
          userId: selectedPatient,
          bodyTemperature: parseFloat(vitals.temperature),
          heartRate: parseInt(vitals.heartRate, 10),
          bloodPressure: vitals.bloodPressure,
          respiratoryRate: parseInt(vitals.respiratoryRate, 10),
        },
      });
      alert('Vital signs added successfully!');
    } catch (err) {
      alert('Error adding vital signs: ' + err.message);
    }
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients: {error.message}</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Select Patient</Form.Label>
        <Form.Control as="select" value={selectedPatient} onChange={handlePatientChange}>
          <option value="">Select a patient</option>
          {data.listUsers.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Body Temperature</Form.Label>
        <Form.Control
          type="number"
          name="temperature"
          value={vitals.temperature}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Heart Rate</Form.Label>
        <Form.Control
          type="number"
          name="heartRate"
          value={vitals.heartRate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Blood Pressure</Form.Label>
        <Form.Control
          type="text"
          name="bloodPressure"
          value={vitals.bloodPressure}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Respiratory Rate</Form.Label>
        <Form.Control
          type="number"
          name="respiratoryRate"
          value={vitals.respiratoryRate}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Submit Vitals</Button>
    </Form>
  );
}

export default VitalsForm;
