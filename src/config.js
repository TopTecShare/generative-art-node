const layersOrder = [
  // MH for Must have, OP for Optional
  { name: "background", type: "MH" },
  { name: "base", type: "MH" },
  { name: "eye", type: "MH" },
  { name: "mouth", type: "MH" },
  { name: "fur", type: "MH" },
  { name: "holding", type: "MH" },

  { name: "eyewear", type: "OP" },
  { name: "clothing", type: "OP" },
  { name: "headgear", type: "OP" },
  { name: "earring", type: "OP" },
];

const format = {
  width: 250,
  height: 250,
};

const rarity = [
  { key: "", val: -1 },
  { key: "common", val: 0.6 },
  { key: "uncommon", val: 0.3 },
  { key: "rare", val: 0.1 },
];

const defaultEdition = 12000;

const numberToProduce = {
  mh: 5,
  mh_o1: 4,
  mh_o2: 3,
  mh_o3: 2,
  mh_o4: 1,
};

module.exports = {
  layersOrder,
  format,
  rarity,
  defaultEdition,
  numberToProduce,
};
