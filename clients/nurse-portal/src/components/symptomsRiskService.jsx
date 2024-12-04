import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getSymptomsRisk = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/run`);
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching symptoms risk data:", error);
    throw error;
  }
};