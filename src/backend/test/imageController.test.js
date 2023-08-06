const { addImagesToPlanet } = require('../controllers/imageController');
const { Planet } = require('../models/Planet');
const cloudinary = require('../utils/cloudinary');

jest.mock('../models/Planet');
jest.mock('../utils/cloudinary');

describe('addImagesToPlanet', () => {
  test('correctly adds images to a planet', async () => {
    // Set up mock data
    const planetId = '12345';
    const planet = { _id: planetId, images: [] };
    Planet.findById.mockResolvedValue(planet);
    cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'https://example.com/image.jpg' });

    // Call the function with mock data
    const req = { params: { id: planetId }, body: { images: ['data:image/jpeg;base64,...'] } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await addImagesToPlanet(req, res);

    // Check that the function correctly updated the planet
    expect(planet.images).toEqual([{ url: 'https://example.com/image.jpg' }]);
  });
});
