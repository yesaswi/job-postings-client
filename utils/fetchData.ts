// /utils/fetchData.ts
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
};
