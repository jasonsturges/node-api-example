const { Character } = require("../models");

const seed = () => {
  Character.create({
    name: "Mickey Mouse",
    description: "A cheerful and plucky anthropomorphic mouse",
  });

  Character.create({
    name: "Donald Duck",
    description: "Pompous, showboating duck wearing a sailor suit, cap, and a bow tie",
  });

  Character.create({
    name: "Goofy",
    description: "Anthropomorphic dog characterized as a hick with a southern drawl",
  });
};

module.exports = seed;
