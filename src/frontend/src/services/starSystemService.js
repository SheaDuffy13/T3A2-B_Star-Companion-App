import api from '../config/api';

export async function getAllStarSystems() {
  const response = await api.get('/api/starSystem');
  return response.data;
}

export async function getStarSystem(id) {
  const response = await api.get(`/api/starSystem/${id}`);
  return response.data;
}
