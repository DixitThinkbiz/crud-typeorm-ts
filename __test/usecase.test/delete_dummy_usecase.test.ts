// Import necessary functions and dependencies
import { EntityManager } from 'typeorm';
import { DummyRepositoryPort } from '../../src/application/port/repositories/dummy_repo.port';
import { getDummyUsecase } from '../../src/application/use_cases/dummy/get_dummy.usecase';
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

describe('deleteDummyUsecase', () => {
  // Test case for successful delete of dummy user information
  test('should delete', async () => {
    // Mock the behavior of DummyRepositoryPort
    const mockDummyData: Dummy[] = [{ id: 1, name: 'Dummy',email:'Dummy1@mail.com',password:''  }];
    ( mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(mockDummyData);

    // Call the usecase function
    await deleteDummyUsecase(mockDummyRepo, 1, mockEntityManager);

    // Expect deleteDummy to be called with the correct ID
    expect(mockDummyRepo.deleteDummy).toHaveBeenCalledWith(1, mockEntityManager);
    
  });

  // Test case for user not found
  test('should throw an error when user is not found', async () => {
    // Mock the behavior of DummyRepositoryPort
    ( mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce([]);

    // Call the usecase function
    await expect(deleteDummyUsecase(mockDummyRepo, 2, mockEntityManager)).rejects.toThrow(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  });
});

