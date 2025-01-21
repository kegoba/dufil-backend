import request from 'supertest';
import express from 'express';
import { sign_up_user, sign_in_user } from './controller.js';
import { signUp, signIn } from './repository.js';


jest.mock('./repository.js');

const app = express();
app.use(express.json());
app.post('/auth/signup', sign_up_user);
app.post('/auth/signin', sign_in_user);

describe('Auth Controller Tests', () => {
  describe('POST /auth/signup', () => {
    it('should sign up a user successfully', async () => {
      const mockResponse = {
        id: '1',
        first_name: 'kelvin',
        last_name : "Egoba",
        email: 'kelvin@gmail.com',
      };

      signUp.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/auth/signup')
        .send({
          first_name: 'kelvin',
          last_name : "Egoba",
          email: 'kelvin@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.msg).toBe('signup Succussful');
      expect(response.body.data).toEqual(mockResponse);
      expect(signUp).toHaveBeenCalledWith({
        first_name: 'kelvin',
        last_name : "Egoba",
        email: 'kelvin@gmail.com',
        password: 'password123',
      });
    });

    it('should return 400 when signup fails', async () => {
      signUp.mockRejectedValue(new Error('Email already exists'));

      const response = await request(app)
        .post('/auth/signup')
        .send({
          first_name: 'kelvin',
          last_name : "Egoba",
          email: 'kelvin@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('faile to sign up user');
      expect(response.body.error).toBe('Email already exists');
    });
  });

  describe('POST /auth/signin', () => {
    it('should sign in a user successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'kelvin@gmail.com',
        password: 'password123',
        token: 'mock-jwt-token',
      };

      signIn.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'kelvin@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('signin Succussful');
      expect(response.body.data).toEqual(mockUser);
      expect(signIn).toHaveBeenCalledWith('kelvin@gmail.com', 'password123');
    });

    it('should return 400 when signin fails', async () => {
      signIn.mockRejectedValue(new Error('Invalid email or password'));

      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'wrongemail@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Invalid email or password');
    });
  });
});
