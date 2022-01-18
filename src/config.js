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

const numberToProduce = {
  mh: 5,
  mh_o1: 4,
  mh_o2: 3,
  mh_o3: 2,
  mh_o4: 1,
};

const totalSupply = {
  mh: {
    common: 24,
    uncommon: 120,
    rare: 6,
    superrare: 80,
    legendary: 0,
  },

  mh_o1: {
    common: 180,
    uncommon: 90,
    rare: 40,
    superrare: 0,
    legendary: 1,
  },
  mh_o2: {
    common: 9,
    uncommon: 4,
    rare: 2,
    superrare: 0,
    legendary: 1,
  },
  mh_o3: {
    common: 60,
    uncommon: 30,
    rare: 1,
    superrare: 0,
    legendary: 8,
  },
  mh_o4: {
    common: 30,
    uncommon: 10,
    rare: 80,
    superrare: 0,
    legendary: 60,
  },
};

const defaultEdition =
  totalSupply["mh"]["common"] +
  totalSupply["mh"]["uncommon"] +
  totalSupply["mh"]["rare"] +
  totalSupply["mh"]["superrare"] +
  totalSupply["mh"]["legendary"] +
  totalSupply["mh_o1"]["common"] +
  totalSupply["mh_o1"]["uncommon"] +
  totalSupply["mh_o1"]["rare"] +
  totalSupply["mh_o1"]["superrare"] +
  totalSupply["mh_o1"]["legendary"] +
  totalSupply["mh_o2"]["common"] +
  totalSupply["mh_o2"]["uncommon"] +
  totalSupply["mh_o2"]["rare"] +
  totalSupply["mh_o2"]["superrare"] +
  totalSupply["mh_o2"]["legendary"] +
  totalSupply["mh_o3"]["common"] +
  totalSupply["mh_o3"]["uncommon"] +
  totalSupply["mh_o3"]["rare"] +
  totalSupply["mh_o3"]["superrare"] +
  totalSupply["mh_o3"]["legendary"] +
  totalSupply["mh_o4"]["common"] +
  totalSupply["mh_o4"]["uncommon"] +
  totalSupply["mh_o4"]["rare"] +
  totalSupply["mh_o4"]["superrare"] +
  totalSupply["mh_o4"]["legendary"];

const minRarity = {
  Common: 55,
  Uncommon: 201,
  Rare: 401,
  Superrare: 851,
  Legendary: 1001,
};

const maxRarity = {
  Common: 200,
  Uncommon: 400,
  Rare: 850,
  Superrare: 1000,
  Legendary: 1597,
};

module.exports = {
  layersOrder,
  format,
  rarity,
  defaultEdition,
  numberToProduce,
  totalSupply,
  minRarity,
  maxRarity,
};
