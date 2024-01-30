// Import necessary functions and dependencies
import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../src/application/port/repositories/dummy_repo.port";
import { constants } from "../../src/infrastructure/config/constant";
import { AuthLogin, Dummy } from "../../src/domain/models/dummy";
import { updateDummyUsecase } from "../../src/application/use_cases/dummy/update__dummy.usecase";

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

describe("updateDummyUsecase", () => {
  // Test case for successful update of existing dummy user
  test("should update dummy user when ID exists and email is unique", async () => {
    // Mock the behavior of DummyRepositoryPort to return existing dummy user with the same ID
    const mockExistingDummy: Dummy[] = [
      { id: 1, name: "Dummy", email: "dummy@example.com", password: "" },
    ];
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(
      mockExistingDummy
    );
    // Mock the behavior of DummyRepositoryPort to return null (no existing user with the same email)
    (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(
      null
    );

    // Call the usecase function
    const dummyData: Dummy = {
      id: 1,
      name: "Updated Dummy",
      email: "updated@example.com",
      password: "",
    };
    await updateDummyUsecase(mockDummyRepo, 1, dummyData, mockEntityManager);

    // Expect updateDummy to be called with the correct ID and dummy data
    expect(mockDummyRepo.updateDummy).toHaveBeenCalledWith(
      1,
      dummyData,
      mockEntityManager
    );
  });

  // Test case for attempting to update non-existing dummy user
  test("should throw an error when user with the specified ID does not exist", async () => {
    // Mock the behavior of DummyRepositoryPort to return empty result (no existing user with the specified ID)
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(null);

    // Call the usecase function and expect it to throw an error
    const dummyData: Dummy = {
      id: 1,
      name: "Updated Dummy",
      email: "updated@example.com",
      password: "",
    };
    await expect(
      updateDummyUsecase(mockDummyRepo, 1, dummyData, mockEntityManager)
    ).rejects.toThrow(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  });

  // Test case for attempting to update dummy user with an existing email
  test("should throw an error when user with the specified email already exists", async () => {
    // Mock the behavior of DummyRepositoryPort to return existing user with the same email
    const mockExistingDummy: Dummy[] = [
      { id: 2, name: "Dummy", email: "existing@example.com", password: "" },
    ];
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(
      mockExistingDummy
    );
    const existingDummy: AuthLogin = {
      id: 2,
      email: "existing@example.com",
      password: "",
    };
    (mockDummyRepo.checkDummyEmailExist as jest.Mock).mockResolvedValueOnce(
      existingDummy
    );

    // Call the usecase function and expect it to throw an error
    const dummyData: Dummy = {
      id: 1,
      name: "Updated Dummy",
      email: "existing@example.com",
      password: "",
    };
    await expect(
      updateDummyUsecase(mockDummyRepo, 1, dummyData, mockEntityManager)
    ).rejects.toThrow(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  });
});
