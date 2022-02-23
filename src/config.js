const layersOrder = [
  { name: "Backgrounds" },
  { name: "Body" },
  { name: "Shell" },
  { name: "Head" },
];

const format = {
  width: 2000,
  height: 2000,
};

const rarity = [
  { key: "", val: -1 },
  { key: "common", val: 0.4 },
  { key: "uncommon", val: 0.5 },
  { key: "rare", val: 0.1 },
];

const defaultEdition = 10;

module.exports = { layersOrder, format, rarity, defaultEdition };
