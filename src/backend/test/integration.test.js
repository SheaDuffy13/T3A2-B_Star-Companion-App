const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Integration tests', () => {
  test('creating a new planet, adding images to it, and then retrieving all images for that planet', async () => {
    // Create a new planet
    const planetResponse = await request(app)
      .post('/api/planet')
      .send({ name: 'New Planet', star: '12345' });
    const planetId = planetResponse.body._id;

    // Add images to the planet
    await request(app)
      .post(`/api/planet/${planetId}/images`)
      .send({ images: ['data:image/jpeg;base64,...'] });

    // Retrieve all images for the planet
    const imagesResponse = await request(app).get(`/api/planet/${planetId}/images`);
    expect(imagesResponse.body).toEqual([{ url: 'https://example.com/image.jpg' }]);
  });

  test('creating a new planet, updating its information, and then retrieving the updated information', async () => {
    // Create a new planet
    const planetResponse = await request(app)
      .post('/api/planet')
      .send({ name: 'New Planet', star: '12345' });
    const planetId = planetResponse.body._id;

    // Update the planet's information
    await request(app)
      .put(`/api/planet/${planetId}`)
      .send({ name: 'Updated Planet' });

    // Retrieve the updated information for the planet
    const updatedPlanetResponse = await request(app).get(`/api/planet/${planetId}`);
    expect(updatedPlanetResponse.body.name).toEqual('Updated Planet');
  });
});
