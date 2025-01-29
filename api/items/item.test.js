import request from 'supertest';
import express from 'express';
import {
  create_item,
  get_items,
  get_item,
  update_item,
  delete_item,
} from './controller.js';
import {
  createItem,
  getItemById,
  deleteItem,
  getAllItems,
  updateItem,
} from './repository.js';
import {Item} from "../../models/item.js"

jest.mock('./repository.js');

const app = express();
app.use(express.json());
app.post('/item/create', create_item);
app.get('/item/findall', get_items);
app.get('/item/findone/:id', get_item);
app.put('/item/update/:id', update_item);
app.delete('/item/delete/:id', delete_item);



beforeEach(async () => {
  await Item.deleteMany(); 
});

describe('Controller Tests', () => {
  describe('POST /item/create', () => {
    it('should create an item successfully', async () => {
      const mockItem = {
        id: '1',
        name: 'Test Item',
        description: 'Test Description',
        createdBy: 'user1',
      };
      createItem.mockResolvedValue(mockItem);

      const response = await request(app)
        .post('/item/create')
        .send({ name: 'Test Item', description: 'Test Description' })
        .set('user', JSON.stringify({ userId: 'user1' }));

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockItem);
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app).post('/item/create').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Failed to create Item');
    });
  });

  describe('GET /item/findall', () => {
    it('should fetch all items successfully', async () => {
      const mockItems = [
        { id: '1', name: 'Item 1', description: 'Description 1' },
        { id: '2', name: 'Item 2', description: 'Description 2' },
      ];
      getAllItems.mockResolvedValue(mockItems);

      const response = await request(app).get('/item/findall');
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockItems);
    });
  });

  describe('GET /item/findone/:id', () => {
    it('should fetch a single item successfully', async () => {
      const mockItem = { id: '1', name: 'Item 1', description: 'Description 1' };
      getItemById.mockResolvedValue(mockItem);

      const response = await request(app).get('/item/findone/1');
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockItem);
    });

    it('should return 400 if item is not found', async () => {
      getItemById.mockResolvedValue(null);

      const response = await request(app).get('/item/findone/999');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('failed to fetch item');
    });
  });

  describe('PUT /item/update/:id', () => {
    it('should update an item successfully', async () => {
      const mockItem = { id: '1', name: 'Updated Item', description: 'Updated Description' };
      getItemById.mockResolvedValue(mockItem);
      updateItem.mockResolvedValue(mockItem);

      const response = await request(app)
        .put('/item/update/1')
        .send({ name: 'Updated Item', description: 'Updated Description' });

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockItem);
    });

    it('should return 400 if item is not found', async () => {
      getItemById.mockResolvedValue(null);

      const response = await request(app)
        .put('/item/update/999')
        .send({ name: 'Updated Item' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('failed to fetch item');
    });
  });

  describe('DELETE /item/delete/:id', () => {
    it('should delete an item successfully', async () => {
      const mockItem = { id: '1', name: 'Item 1' };
      getItemById.mockResolvedValue(mockItem);
      deleteItem.mockResolvedValue(true);

      const response = await request(app).delete('/item/delete/1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Item deleted successfully');
    });

    it('should return 400 if item is not found', async () => {
      getItemById.mockResolvedValue(null);

      const response = await request(app).delete('/item/delete/999');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Internal Server Error');
    });
  });
});