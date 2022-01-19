const fs = require("fs");

const {
  eye,
  mouth,
  fur,
  holding,
  background,
  eyewear,
  clothing,
  headgear,
  earring,
  base,
} = require("./attribute");

const metadata = require("./_metadata.json");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const metadataDir = `${process.env.PWD}/metadata`;

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

const layerConverter = {
  eye: "Eyes",
  mouth: "Mouth",
  fur: "Fur",
  holding: "Holding",
  background: "Background",
  eyewear: "Eyewear",
  clothing: "Clothing",
  headgear: "Headgear",
  earring: "Earrings",
  base: "Base",
};

const checkRarity = (rarity) => {
  // console.log("ATTRIBUTES", _attributes);

  // console.log("RARITY", rarity);

  if (rarity >= minRarity["Common"] && rarity <= maxRarity["Common"])
    return "common";
  if (rarity >= minRarity["Uncommon"] && rarity <= maxRarity["Uncommon"])
    return "uncommon";
  if (rarity >= minRarity["Rare"] && rarity <= maxRarity["Rare"]) return "rare";
  if (rarity >= minRarity["Superrare"] && rarity <= maxRarity["Superrare"])
    return "superrare";
  if (rarity >= minRarity["Legendary"] && rarity <= maxRarity["Legendary"])
    return "legendary";
};

metadata.map((meta) => {
  let wtSum = 0;
  let greenRestriction = false;

  let attributes = meta.attributes.map((el) => {
    wtSum += Number(el.rarity);

    if (el.layer == "eye" && el.name == "snake eyes") greenRestriction = true;
    if (el.layer == "fur" && el.name == "lime crystal") greenRestriction = true;

    return {
      trait_type: layerConverter[el.layer],
      value: el.name,
    };
  });

  let rarity = checkRarity(wtSum);
  if (greenRestriction) {
    rarity = { rare: "superrare" }[rarity];
  }

  attributes.push({
    trait_type: "Rarity",
    value: rarity,
  });

  let obj = {
    name: `#${meta.edition}`,
    title: "Mooning Monkey",
    description:
      "Start your Mooning Monkey evolution process now and try to own an Elite Eternal Yeti. Only 500 will ever exist!",
    external_url: "",
    image: `${meta.edition}.png`,
    attributes,
    properties: {
      category: "image",
      files: [
        {
          uri: `${meta.edition}.png`,
          type: "image/png",
        },
      ],
      creators: [],
    },
  };

  let data = JSON.stringify(obj);
  fs.writeFileSync(`${metadataDir}/${meta.edition}.json`, data);
});
