import axios from "axios";

const API_URL = 'http://localhost:3001/login';

export const login = async (data: any) => {
  return await axios.get(API_URL, data);
};
