import api from './api';

export async function getAllPlanets() {
    const response = await api.get('/planets');
    return response.data;
  }
  
  export async function createPlanet(newPlanet) {
    const response = await api.post('/planets', newPlanet);
    return response.data;
  }
  
  export async function updatePlanet(id, updatedPlanet) {
    const response = await api.put(`/planets/${id}`, updatedPlanet);
    return response.data;
  }
  
  export async function removePlanet(id) {
    const response = await api.delete(`/planets/${id}`);
    return response.data;
  }

//----PLANET IMAGES-----------------------------------------------------------------------

export async function addImage(planetId, newImage) {
    const response = await api.post(`/planets/${planetId}/images`, newImage);
    return response.data;
  }
  
  export async function updateImage(planetId, imageId, updatedImage) {
    const response = await api.put(`/planets/${planetId}/images/${imageId}`, updatedImage);
    return response.data;
  }
  
  export async function deleteImage(planetId, imageId) {
    const response = await api.delete(`/planets/${planetId}/images/${imageId}`);
    return response.data;
  }

//----PLANET NOTES-----------------------------------------------------------------------
export async function addNote(planetId, newNote) {
    const response = await api.post(`/planets/${planetId}/notes`, newNote);
    return response.data;
  }
  
  export async function updateNote(planetId, noteId, updatedNote) {
    const response = await api.put(`/planets/${planetId}/notes/${noteId}`, updatedNote);
    return response.data;
  }
  
  export async function deleteNote(planetId, noteId) {
    const response = await api.delete(`/planets/${planetId}/notes/${noteId}`);
    return response.data;
  }