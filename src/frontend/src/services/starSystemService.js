import api from './api';

export async function getAllStarSystems() {
  const response = await api.get('/starSystems');
  return response.data;
}

export async function getStarSystem(id) {
  const response = await api.get(`/starSystems/${id}`);
  return response.data;
}
