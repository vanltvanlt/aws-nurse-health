import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/SymptomChecklist.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SymptomChecklist() {
  const symptoms = [
    "Fever",
    "Cough",
    "Sore Throat",
    "Runny or Stuffy Nose",
    "Muscle Aches",
    "Headache",
    "Fatigue",
    "Mucus Production",
    "Shortness of Breath",
    "Chest Pain",
    "Nausea",
    "Vomiting",
    "Lightheadedness",
    "Sweating",
    "Changes in Bowel or Bladder Habits",
    "Numbness on One Side of the Body",
    "Confusion",
    "Difficulty Speaking",
    "Trouble Seeing in One Eye",
    "Severe Headache",
    "Lump",
    "Unexplained Weight Loss",
    "Sudden Weakness",
    "Persistent Cough",
    "Unexplained Bleeding or Discharge",
    "Cuts that are Slow to Heal",
    "Indigestion",
    "Increased Thirst",
    "Frequent Urination",
    "Blurred Vision",
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSymptoms((prev) =>
      checked ? [...prev, value] : prev.filter((symptom) => symptom !== value)
    );
  };

  useEffect(() => {
    console.log(selectedSymptoms);
  }, [selectedSymptoms]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className='form-options mb-4'>
        {symptoms.map((symptom) => (
          <Form.Check
            key={symptom}
            label={symptom}
            value={symptom}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <Button type='submit' className='button'>
        Submit Symptoms
      </Button>
    </Form>
  );
}
