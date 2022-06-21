const faker = require("faker");
const mongoose = require("mongoose");
const Character = require("../../src/models/character.model");

const testCharacter = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  description: faker.lorem.text(),
};

const insertCharacters = async (characters) => {
  await Character.insertMany(characters.map((character) => ({ ...character })));
};

module.exports = {
  testCharacter,
  insertCharacters,
};
