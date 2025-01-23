import axios from 'axios';

const API_URL = 'http://localhost:3001/reservations';

export const fetchReservations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createReservation = async (reservation: any) => {
  const response = await axios.post(API_URL, reservation);
  return response.data;
};

export const updateReservation = async (id: number, data: any) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};

