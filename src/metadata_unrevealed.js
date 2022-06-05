const fs = require("fs");
const metadata = require("../build/_metadata.json");
const { getRarity } = require("./generate.js");
if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const metadataDir = `${process.env.PWD}/build/metadata_unrevealed`;

const ipfs =
  "https://gateway.pinata.cloud/ipfs/QmNTAGnpKrBDLaBTbpu5K1tax5gk1mKN1KS5cZGB1nAmAG";
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
    image: `${ipfs}`,
    attributes: [],
    properties: {
      category: "image",
      files: [{ uri: `${data.edition}.png`, type: "image/png" }],
      creators: [],
    },
  };
  fs.writeFileSync(`${metadataDir}/${data.edition}`, JSON.stringify(sample));
});
