import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../src/application/port/repositories/dummy_repo.port";
import { AuthLogin, Dummy } from "../../src/domain/models/dummy";
import { loginUsecase } from "../../src/application/use_cases/authUsecase/login.usecase";
import { constants } from "../../src/infrastructure/config/constant";


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

describe('loginUsecase', () => {
    // Test case for successful login
    test('should return dummy user when authentication is successful', async () => {
        // Mock the behavior of DummyRepositoryPort to return dummy user with the provided email
        const dummy: AuthLogin = { email: 'dummy@example.com', password: 'password' };
        const mockSelectedDummy: AuthLogin = { id: 1, email: 'dummy@example.com', password: 'password' };
        (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(mockSelectedDummy);;

        // Call the usecase function
        const result = await loginUsecase(mockDummyRepo, dummy, mockEntityManager);

        // Expect the result to be the same as the selected dummy
        expect(result).toEqual(mockSelectedDummy);
    });

    // Test case for authentication failure (email not found)
    test('should throw an error when user with the provided email does not exist', async () => {
        // Mock the behavior of DummyRepositoryPort to return null (no user with the provided email)
        const dummy: AuthLogin = { email: 'nonexistent@example.com', password: 'password' };
        (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(null);
        // Call the usecase function and expect it to throw an error
        await expect(loginUsecase(mockDummyRepo, dummy, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
    });

    // Test case for authentication failure (incorrect password)
    test('should throw an error when provided password is incorrect', async () => {
        // Mock the behavior of DummyRepositoryPort to return a dummy user with different password
        const dummy: AuthLogin = { email: 'dummy@example.com', password: 'incorrect_password' };
        const mockSelectedDummy: AuthLogin = { id: 1, email: 'dummy@example.com', password: 'correct_password' };
        (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(mockSelectedDummy);
       
        // Call the usecase function and expect it to throw an error
        await expect(loginUsecase(mockDummyRepo, dummy, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
    });
});
