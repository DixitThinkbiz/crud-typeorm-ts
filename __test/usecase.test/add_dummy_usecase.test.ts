// Import necessary functions and dependencies
import { EntityManager } from 'typeorm';
import { DummyRepositoryPort } from '../../src/application/port/repositories/dummy_repo.port';
import { constants } from '../../src/infrastructure/config/constant';
import { AuthLogin, Dummy } from '../../src/domain/models/dummy';
import { deleteDummyUsecase } from '../../src/application/use_cases/dummy/delete_dummy.usecase';
import { addDummyUsecase } from '../../src/application/use_cases/dummy/add_dummy.usecase';
import { updateDummyUsecase } from '../../src/application/use_cases/dummy/update__dummy.usecase';


// Mock DummyRepositoryPort
const mockDummyRepo: DummyRepositoryPort = {
  getDummy: jest.fn(),
  deleteDummy: jest.fn(),
  updateDummy: jest.fn(),
  addDummy: jest.fn(),
  checkDummyEmailExist: jest.fn(),
  wrapTransaction: jest.fn(),
};

// Mock EntityManager
const mockEntityManager: EntityManager = {} as EntityManager;

describe('addDummyUsecase', () => {
  // Test case for successful addition of a new dummy user
  test('should add dummy user when email does not exist', async () => {
    // Mock the behavior of DummyRepositoryPort to return null (no existing user with the same email)
    (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(null);
    // Call the usecase function
    const dummyData: Dummy = { id: 1, name: 'Dummy', email: 'dummy@example.com', password: '' };
    await addDummyUsecase(mockDummyRepo, dummyData, mockEntityManager);

    // Expect addDummy to be called with the correct dummy data
    expect(mockDummyRepo.addDummy).toHaveBeenCalledWith(dummyData, mockEntityManager);
  });

  // Test case for attempting to add a dummy user with an existing email
  test('should throw an error when user with the same email already exists', async () => {
    // Mock the behavior of DummyRepositoryPort to return existing user with the same email
    const existingDummy: AuthLogin = { id: 1, email: 'dummy@example.com', password: '12376543' };
    const dummyData: Dummy = { id: 2, name: 'New Dummy', email: 'dummy@example.com', password: 'tdgsbah' };

    (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(existingDummy);

    // Call the usecase function and expect it to throw an error
    await expect(addDummyUsecase(mockDummyRepo, dummyData, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  });
});

