import api from '../config/api';

export async function getAllPlanets() {
    const response = await api.get('/api/planet');
    return response.data;
  }

  export async function getPlanet(id) {
    const response = await api.get(`/api/planet/${id}`);
    return response.data;
  }
  
  export async function createPlanet(newPlanet) {
    const response = await api.post('/api/planet', newPlanet);
    return response.data;
  }
  
  export async function updatePlanet(id, updatedPlanet) {
    const response = await api.put(`/api/planet/${id}`, updatedPlanet);
    return response.data;
  }
  
  export async function deletePlanet(id) {
    const response = await api.delete(`/api/planet/${id}`);
    return response.data;
  }

//----PLANET IMAGES-----------------------------------------------------------------------

export async function addImage(planetId, newImage) {
    const response = await api.post(`/api/planet/${planetId}/image`, newImage);
    return response.data;
  }
  
  export async function updateImage(planetId, imageId, updatedImage) {
    const response = await api.put(`/api/planet/${planetId}/image/${imageId}`, updatedImage);
    return response.data;
  }
  
  export async function deleteImage(planetId, imageId) {
    const response = await api.delete(`/api/planet/${planetId}/image/${imageId}`);
    return response.data;
  }

//----PLANET NOTES-----------------------------------------------------------------------
export async function addNote(planetId, newNote) {
    const response = await api.post(`/api/planet/${planetId}/note`, newNote);
    return response.data;
  }
  
  export async function updateNote(planetId, noteId, updatedNote) {
    const response = await api.put(`/api/planet/${planetId}/note/${noteId}`, updatedNote);
    return response.data;
  }
  
  export async function deleteNote(planetId, noteId) {
    const response = await api.delete(`/api/planet/${planetId}/note/${noteId}`);
    return response.data;
  }