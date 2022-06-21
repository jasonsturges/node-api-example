const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
characterSchema.plugin(toJSON);
characterSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The character's name
 * @param {ObjectId} [excludeCharacterId] - The id of the character to be excluded
 * @returns {Promise<boolean>}
 */
characterSchema.statics.isNameTaken = async function (name, excludeCharacterId) {
  const character = await this.findOne({ name, _id: { $ne: excludeCharacterId } });
  return !!character;
};

/**
 * @typedef Character
 */
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
