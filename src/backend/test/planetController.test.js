const { createPlanet } = require('../controllers/planetController');
const Star = require('../models/StarSystem');
const { Planet } = require('../models/Planet');

jest.mock('../models/StarSystem');
jest.mock('../models/Planet');

describe('createPlanet', () => {
  test('correctly creates a new planet', async () => {
    // Set up mock data
    const starId = '12345';
    const star = { _id: starId, planets: [] };
    Star.findById.mockResolvedValue(star);
    Planet.create.mockResolvedValue({ 
      name: 'New Planet', 
      star: starId,
      images: [],
      note: '',
      userId: '67890'
    });

    // Call the function with mock data
    const req = { body: { name: 'New Planet', star: starId, userId: '67890', images: [], note: '' }, userId: '67890' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await createPlanet(req, res);

    // Check that the function correctly created the planet and updated the star
    expect(Planet.create).toHaveBeenCalledWith({ name: 'New Planet', star: starId, userId: '67890', images: [], note: ''});
    expect(star.planets).toEqual([{ name: 'New Planet', star: starId, userId: '67890', images: [], note: '' }]);
  });
});
