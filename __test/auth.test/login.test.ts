import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../src/application/port/repositories/dummy_repo.port";
import { AuthLogin } from "../../src/domain/models/dummy";
import { loginUsecase } from "../../src/application/use_cases/authUsecase/login.usecase";
import { constants } from "../../src/infrastructure/config/constant";
import jwt from 'jsonwebtoken';


// Mock DummyRepositoryPort
const mockDummyRepo: DummyRepositoryPort = {
    checkDummyEmailExist: jest.fn(),
    getDummy: jest.fn(),
    deleteDummy: jest.fn(),
    updateDummy: jest.fn(),
    addDummy: jest.fn(),
    wrapTransaction: jest.fn(),
};


  
  // Mock EntityManager
  const mockEntityManager: EntityManager = {} as EntityManager;
  
 
  
  // Mock jwt module
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  
  describe('loginUsecase', () => {
    // Test case for successful login
    test('should return token when authentication succeeds', async () => {
      // Mock the behavior of DummyRepositoryPort to return existing user with the provided email and password
      const dummyData: AuthLogin = { id: 1, email: 'dummy@example.com', password: 'password123' };
      (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(dummyData);
  
      // Mock jwt.sign to return a token
      const mockToken = 'mock-token';
      (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);
  
      // Call the usecase function
      const result = await loginUsecase(mockDummyRepo, dummyData, mockEntityManager);
      // Expect jwt.sign to be called with the correct parameters
      // Expect the result to be the token
      expect(result).toEqual(mockToken);
    });
  
    // Test case for authentication failure due to incorrect password
    test('should throw an error when password is incorrect', async () => {
      // Mock the behavior of DummyRepositoryPort to return existing user with the provided email, but incorrect password
      const dummy: AuthLogin = { email: 'dummy@example.com', password: 'incorrect_password' };
        const mockSelectedDummy: AuthLogin = { id: 1, email: 'dummy@example.com', password: 'correct_password' };
        (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(mockSelectedDummy);
      // Call the usecase function and expect it to throw an error
      await expect(loginUsecase(mockDummyRepo, dummy, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  
    
    });
  
    // Test case for authentication failure due to non-existing user
    test('should throw an error when user with the provided email does not exist', async () => {
      // Mock the behavior of DummyRepositoryPort to return null (no user with the provided email)
      (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(null);
  
      // Call the usecase function and expect it to throw an error
      const dummyData: AuthLogin = { id: 1, email: 'nonexistent@example.com', password: 'password123' };
      await expect(loginUsecase(mockDummyRepo, dummyData, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);

    });
  });