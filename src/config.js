const layersOrder = [
  { name: "Backgroundz", val: 1 },
  { name: "Bodaa", val: 1 },
  { name: "Clotes", val: 0.5 },
  { name: "EErs", val: 1 },
  { name: "Hed", val: 1 },
  { name: "Skincare", val: 0.5 },
  { name: "Smileee", val: 1 },
  { name: "Eyye", val: 1 },
  { name: "Smellthat", val: 1 },
  { name: "Lookingood", val: 0.5 },
  { name: "Hatz", val: 0.5 },
];

const format = {
  width: 1001,
  height: 1001,
};

const rarity = {
  Common: 0.5,
  Uncommon: 0.25,
  Rare: 0.15,
  "Super Rare": 0.08,
  Legendary: 0.02,
};

const defaultEdition = 100;

module.exports = { layersOrder, format, rarity, defaultEdition };
