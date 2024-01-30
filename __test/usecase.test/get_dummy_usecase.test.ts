// Import necessary functions and dependencies
import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../src/application/port/repositories/dummy_repo.port";
import { getDummyUsecase } from "../../src/application/use_cases/dummy/get_dummy.usecase";
import { constants } from "../../src/infrastructure/config/constant";
import { Dummy } from "../../src/domain/models/dummy";
import { deleteDummyUsecase } from "../../src/application/use_cases/dummy/delete_dummy.usecase";
import { addDummyUsecase } from "../../src/application/use_cases/dummy/add_dummy.usecase";
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

describe("getDummyUsecase", () => {
  // Test case for successful retrieval of dummy user information
  test("should return dummy user information when found", async () => {
    // Mock the behavior of DummyRepositoryPort
    const mockDummyData: Dummy[] = [
      {
        id: 1,
        name: "Dummy",
        email: "Dummy1@mail.com",
        description: "description",
        password: "",
      },
    ];
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(mockDummyData);

    // Call the usecase function
    const result = await getDummyUsecase(mockDummyRepo, {id:1}, mockEntityManager);

    // Expect the result to be the same as the mocked dummy data
    expect(result).toEqual(mockDummyData[0]);
  });

  // Test case for user not found
  test("should throw an error when user is not found", async () => {
    // Mock the behavior of DummyRepositoryPort
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce([]);

    // Call the usecase function
    await expect(
      getDummyUsecase(mockDummyRepo, {id:1}, mockEntityManager)
    ).rejects.toThrow(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  });

  // Test case for no ID provided
  test("should return all dummy data when no ID is provided", async () => {
    // Mock the behavior of DummyRepositoryPort
    const mockDummyData: Dummy[] = [
      {
        id: 1,
        name: "Dummy1",
        email: "Dummy1@mail.com",
        description: "description1",
        password: "",
      },
      { id: 2, name: "Dummy2", email: "Dummy2@mail.com", password: "" },
    ];
    (mockDummyRepo.getDummy as jest.Mock).mockResolvedValueOnce(mockDummyData);

    // Call the usecase function without providing an ID
    const result = await getDummyUsecase(
      mockDummyRepo,
      null,
      mockEntityManager
    );

    // Expect the result to be the same as the mocked dummy data
    expect(result).toEqual(mockDummyData);
  });
});
