const layersOrder = [
  { name: "Background" },
  { name: "Back Left" },
  { name: "Back Right" },
  { name: "Bottom" },
  { name: "Sphere" },
  { name: "Front Left" },
  { name: "Front Right" },
  { name: "Top" },
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

const defaultEdition = 1728;

module.exports = { layersOrder, format, rarity, defaultEdition };
