const fs = require("fs");
const metadata = require("../build/_metadata.json");
const { getRarity } = require("./generate.js");
if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const metadataDir = `${process.env.PWD}/build/metadata`;

const ipfs =
  "https://ipfs.io/ipfs/QmNYYQLYfeVHAZ9Twanq1VP4y29gg215oYEwLRQSocr92h/";

metadata.map((data) => {
  let attributes = [];
  data.attributes.map((e) => {
    attributes.push({ trait_type: e.layer, value: e.name.split(".")[0] });
  });
  attributes.push({
    trait_type: "Rarity",
    value: getRarity(data.attributes),
  });
  let sample = {
    name: `Goblin Pets #${data.edition}`,
    title: "Goblin Pets",
    description:
      "AAAUUUGHHH goblins pets GOBLINNNns ReKa ma pet uhha snackRik URAH",
    external_url: "",
    image: `${ipfs}${data.edition}.png`,
    attributes,
    properties: {
      category: "image",
      files: [{ uri: `${data.edition}.png`, type: "image/png" }],
      creators: [],
    },
  };
  fs.writeFileSync(`${metadataDir}/${data.edition}`, JSON.stringify(sample));
});
