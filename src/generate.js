const fs = require("fs");
const console = require("console");
const hash = require("object-hash");
const { layersOrder, defaultEdition, rarity } = require("./config.js");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const layersDir = `${process.env.PWD}/layers`;

let metadata = [];
let attributes = [];

const addAttributes = (_layer, _name) => {
  let tempAttr = {
    layer: _layer,
  };
  attributes.push(tempAttr);
};

const addMetadata = (attributes) => {
  let tempMetadata = {
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  console.log(tempMetadata);
  attributes = [];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generate = () => {
  let layerInfo = [];
  let hashmemory = {};
  layersOrder.map(({ name, val }) => {
    const names = getFileNames(name);
    layerInfo.push({ name, val, content: names });
  });
  let elements = [];
  let rarity_count = {
    Common: 0,
    Uncommon: 0,
    Rare: 0,
    "Super Rare": 0,
    Legendary: 0,
  };
  while (elements.length < defaultEdition) {
    let element = [];
    layerInfo.map(({ name, val, content }, index) => {
      Math.random() < val &&
        element.push({
          id: index,
          layer: name.split(".")[0],
          name: content[Math.floor(Math.random() * content.length)],
        });
    });
    if (hashmemory[hash(element)]) continue;
    hashmemory[hash(element)] = true;
    let el_rarity = getRarity(element);
    if (rarity_count[el_rarity] >= rarity[el_rarity] * defaultEdition) continue;
    console.log(elements.length);
    rarity_count[el_rarity]++;
    elements.push(element);
  }
  console.log(elements);
  return elements;
};

const getRarity = (element) => {
  return ["Common", "Uncommon", "Rare", "Super Rare", "Legendary"][
    element.length - 7
  ];
};

const getFileNames = (name) => {
  return fs
    .readdirSync(`${layersDir}/${name}/`)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
};

// generate();
module.exports = { generate, getRarity };
