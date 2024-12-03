import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

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

function DailyInfoForm() {
  const [info, setInfo] = useState({
    heartRate: "",
    bloodPressure: "",
    bodyWeight: "",
    bodyTemperature: "",
    respiratoryRate: "",
  });

  // Mutation to add vital signs
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN_MUTATION);

  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let authUser = null;

    if (!authUser) {
      alert("Please select a patient");
      return;
    }

    try {
      await addVitalSign({
        variables: {
          userId: authUser.id,
          bodyTemperature: parseFloat(info.temperature),
          heartRate: parseInt(info.heartRate, 10),
          bloodPressure: info.bloodPressure,
          respiratoryRate: parseInt(info.respiratoryRate, 10),
          bodyWeight: parseFloat(info.bodyWeight),
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
        <Form.Group>
          <Form.Label className='mt-3'>Temperature (C°)</Form.Label>
          <Form.Control
            type='number'
            name='bodyTemperature'
            value={info.bodyTemperature}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Label className='mt-3'>Heart Rate (bpm)</Form.Label>
        <Form.Control
          type='number'
          name='heartRate'
          value={info.heartRate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className='mt-3'>Blood Pressure (mm Hg)</Form.Label>
        <Form.Control
          type='text'
          name='bloodPressure'
          value={info.bloodPressure}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Respiratory Rate (breaths/min)</Form.Label>
        <Form.Control
          type='number'
          name='respiratoryRate'
          value={info.respiratoryRate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mt-3 mb-4'>
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type='number'
          name='bodyWeight'
          value={info.bodyWeight}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type='submit' className="button">Submit Information</Button>
    </Form>
  );
}

export default DailyInfoForm;
