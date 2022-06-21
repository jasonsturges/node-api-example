const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");
const app = require("../../src/app");
const setupTestDB = require("../utils/setupTestDB");
const { Character } = require("../../src/models");
const { insertCharacters, testCharacter } = require("../fixtures/character.fixture");

setupTestDB();

describe("Character routes", () => {
  let newCharacter;

  beforeEach(() => {
    newCharacter = {
      name: faker.name.findName(),
      description: faker.lorem.text(),
    };
  });

  describe("POST /v1/characters", () => {
    test("should return 201 and successfully create new character if data is ok", async () => {
      const res = await request(app).post("/v1/characters").send(newCharacter).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newCharacter.name,
        description: newCharacter.description,
      });

      const dbCharacter = await Character.findById(res.body.id);
      expect(dbCharacter).toBeDefined();
      expect(dbCharacter).toMatchObject({ name: newCharacter.name, description: newCharacter.description });
    });

    test("should return 400 error if name is already used", async () => {
      await insertCharacters([newCharacter]);

      await request(app).post("/v1/characters").send(newCharacter).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/characters/:characterId", () => {
    test("should return 200 and the character object if data is ok", async () => {
      await insertCharacters([testCharacter]);

      const res = await request(app).get(`/v1/characters/${testCharacter._id}`).send(testCharacter).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: testCharacter._id.toHexString(),
        name: testCharacter.name,
        description: testCharacter.description,
      });
    });
  });

  describe("PATCH /v1/characters/:characterId", () => {
    test("should return 200 and successfully update character if data is ok", async () => {
      await insertCharacters([testCharacter]);

      const updateBody = {
        name: faker.name.findName(),
      };

      const res = await request(app).patch(`/v1/characters/${testCharacter._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: testCharacter._id.toHexString(),
        name: updateBody.name,
        description: testCharacter.description,
      });
    });
  });

  describe("DELETE /v1/characters/:characterId", () => {
    test("should return 204 if data is ok", async () => {
      await insertCharacters([testCharacter]);

      await request(app).delete(`/v1/characters/${testCharacter._id}`).send().expect(httpStatus.NO_CONTENT);

      const dbCharacter = await Character.findById(testCharacter._id);
      expect(dbCharacter).toBeNull();
    });
  });
});
