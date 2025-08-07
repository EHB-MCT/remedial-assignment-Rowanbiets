const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const marketRoutes = require('../../routes/marketRoutes');
const Resource = require('../../models/Resource');



jest.mock('../../models/Resource');

const app = express();
app.use(bodyParser.json());
app.use('/api', marketRoutes);

describe('Market API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/resources', () => {
    it('should return all resources', async () => {
      Resource.find.mockResolvedValue([
        { _id: '1', name: 'Wood', price: 10, supply: 100, demand: 50 },
        { _id: '2', name: 'Stone', price: 15, supply: 80, demand: 20 },
      ]);

      const res = await request(app).get('/api/resources');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe('Wood');
    });
  });

  describe('POST /api/buy', () => {
    it('should buy a resource if enough supply', async () => {
      const resourceData = {
        _id: '1',
        name: 'Wood',
        price: 10,
        supply: 100,
        demand: 50,
        save: jest.fn().mockResolvedValue(true),
      };

      Resource.findOne.mockResolvedValue(resourceData);

      const res = await request(app)
        .post('/api/buy')
        .send({ name: 'Wood', amount: 10 });

      expect(Resource.findOne).toHaveBeenCalledWith({ name: 'Wood' });
      expect(resourceData.supply).toBe(90); // 100 - 10
      expect(resourceData.demand).toBe(60); // 50 + 10
      expect(resourceData.price).toBeGreaterThan(10); // Price increased
      expect(resourceData.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/gekocht/);
    });

    it('should return 400 if invalid input', async () => {
      const res = await request(app).post('/api/buy').send({ name: '', amount: 0 });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Ongeldige input');
    });

    it('should return 404 if resource not found', async () => {
      Resource.findOne.mockResolvedValue(null);
      const res = await request(app).post('/api/buy').send({ name: 'Gold', amount: 5 });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Grondstof niet gevonden');
    });
  });

  describe('POST /api/sell', () => {
    it('should sell a resource', async () => {
      const resourceData = {
        _id: '1',
        name: 'Wood',
        price: 10,
        supply: 100,
        demand: 50,
        save: jest.fn().mockResolvedValue(true),
      };

      Resource.findOne.mockResolvedValue(resourceData);

      const res = await request(app)
        .post('/api/sell')
        .send({ name: 'Wood', amount: 5 });

      expect(resourceData.supply).toBe(105); // 100 + 5
      expect(resourceData.demand).toBe(45); // 50 - 5
      expect(resourceData.price).toBeLessThanOrEqual(10); // Price decreased or same
      expect(resourceData.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/verkocht/);
    });
  });
});
