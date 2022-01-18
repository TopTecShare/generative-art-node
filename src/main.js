const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const reader = require("xlsx");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");

const {
  layersOrder,
  format,
  rarity,
  numberToProduce,
  totalSupply,
  minRarity,
  maxRarity,
} = require("./config.js");
const {
  eye,
  base,
  mouth,
  fur,
  holding,
  background,
  eyewear,
  clothing,
  headgear,
  earring,
} = require("./attribute");
const { INSPECT_MAX_BYTES } = require("buffer");

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Array of dividing elements
const mustHaveElements = ["eyes", "mouths", "furs", "holdings", "backgrounds"];
const OptionalElements = ["eyewears", "clothings", "headgears", "earrings"];

let resultElements = [];

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/build`;
const metDataFile = "_metadata.json";
const layersDir = `${process.env.PWD}/layers`;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
const Exists = new Map();

const addRarity = (_str) => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layersSetup = (layersOrder) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    location: `${layersDir}/${layerObj.name}/`,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: { width: format.width, height: format.height },
    number: getElements(`${layersDir}/${layerObj.name}/`).length,
  }));

  return layers;
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(
    `${buildDir}/${_edition}.png`,
    _canvas.toBuffer("image/png")
  );
};

const addMetadata = (_edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const getLayerOrder = (__filename) => {
  let layerOrder;
  const layers = layersSetup(layersOrder);
  layers.map((x) => {
    x.elements.map((el) => {
      if (el.fileName == __filename) {
        layerOrder = x.id;
      }
    });
  });

  return layerOrder;
};

let isFirstOptional = false;
let prevOpt = 0;

const drawLayer = async (_layer, _edition, _element) => {
  let element = _element;
  console.log(element);

  addAttributes(element, _layer);
  const image = await loadImage(`${_layer.location}${element.name}.png`);

  ctx.drawImage(
    image,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height
  );
  saveLayer(canvas, _edition);
};

const createFiles = async (edition) => {
  // generate MH tokens
  const mhLayers = [
    { name: "background", type: "MH" },
    { name: "base", type: "MH" },
    { name: "eye", type: "MH" },
    { name: "mouth", type: "MH" },
    { name: "fur", type: "MH" },
    { name: "holding", type: "MH" },
  ];
  totalAmount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    superrare: 0,
    legendary: 0,
  };
  await generateRandomElement(mhLayers, "mh");
  console.log("finish here");

  const mh_o1Layers = [
    { name: "background", type: "MH" },
    { name: "base", type: "MH" },
    { name: "eye", type: "MH" },
    { name: "mouth", type: "MH" },
    { name: "fur", type: "MH" },
    { name: "holding", type: "MH" },

    { name: "eyewear", type: "OP" },
  ];
  totalAmount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    superrare: 0,
    legendary: 0,
  };
  await generateRandomElement(mh_o1Layers, "mh_o1");
  console.log("HERERERER");

  const mh_o2Layers = [
    { name: "background", type: "MH" },
    { name: "base", type: "MH" },
    { name: "eye", type: "MH" },
    { name: "mouth", type: "MH" },
    { name: "fur", type: "MH" },
    { name: "holding", type: "MH" },

    { name: "eyewear", type: "OP" },
    { name: "clothing", type: "OP" },
  ];
  totalAmount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    superrare: 0,
    legendary: 0,
  };
  await generateRandomElement(mh_o2Layers, "mh_o2");

  const mh_o3Layers = [
    { name: "background", type: "MH" },
    { name: "base", type: "MH" },
    { name: "eye", type: "MH" },
    { name: "mouth", type: "MH" },
    { name: "fur", type: "MH" },
    { name: "holding", type: "MH" },

    { name: "eyewear", type: "OP" },
    { name: "clothing", type: "OP" },
    { name: "headgear", type: "OP" },
  ];
  totalAmount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    superrare: 0,
    legendary: 0,
  };
  await generateRandomElement(mh_o3Layers, "mh_o3");

  const mh_o4Layers = [
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
  totalAmount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    superrare: 0,
    legendary: 0,
  };
  await generateRandomElement(mh_o4Layers, "mh_o4");

  await shuffleArray(initialMetaData);

  let numDupes = 0;

  const layers = layersSetup(layersOrder);

  for (let i = 1; i <= edition; i++) {
    console.log(initialMetaData[i]);
    await layers.forEach(async (layer) => {
      let element = initialMetaData[i].filter((x) => x.layer == layer.name)[0];
      if (element) await drawLayer(layer, i, element);
    });

    let key = hash.toString();
    if (Exists.has(key)) {
      console.log(
        `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
          key
        )}`
      );
      numDupes++;
      if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
      i--;
    } else {
      Exists.set(key, i);
      addMetadata(i);
      console.log("Creating edition " + i);
    }
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let totalAmount;

let initialMetaData = [];

const redRestriction = {
  mouth: { cigarette: true, joint: true, cigar: true },
  holding: { vape: true, cigar: true },
};

const brownRestriction = {
  mouth: { "ninja mask": true, "hannya mask": true },
};

let mouthElement = null;

const generateRandomElement = (_layers, _class) => {
  const layers = layersSetup(_layers);
  let tmpElements = [];

  do {
    layers.forEach((layer) => {
      // if (layer.name == "mouth") console.log("MOUTH", layer.number);
      let rand = Math.random();
      let num = Math.floor(rand * layer.number);

      if (
        totalAmount["common"] >= totalSupply[_class]["common"] &&
        totalAmount["uncommon"] >= totalSupply[_class]["uncommon"] &&
        totalAmount["rare"] >= totalSupply[_class]["rare"]
      )
        num = layer.number - Math.floor(rand * 4) - 1;
      if (num < 1) num = 1;

      let obj = {
        eye: eye,
        base: base,
        mouth: mouth,
        fur: fur,
        holding: holding,
        background: background,
        eyewear: eyewear,
        clothing: clothing,
        headgear: headgear,
        earring: earring,
      };
      // console.log(layer.name);

      let el = obj[layer.name].filter((x) => x.id == num)[0];
      if (el) {
        // if (layer.name == "mouth") {
        //   mouthElement = el;
        // }
        // // Check if it's Holding layer: RED RESCTRICTION
        // if (
        //   layer.name == "holding" &&
        //   redRestriction["holding"][el.name] &&
        //   redRestriction["mouth"][mouthElement.name]
        // ) {
        //   console.log("RED RESTRICTION", tmpElements);
        //   throw "new";
        //   return;
        // }
        // // Delete Optional for Ninja mask and hannya mask: BROWN RESTRICTION
        // if (_class !== "mh" && brownRestriction["mouth"][mouthElement.name]) {
        //   console.log("BROWN RESTRICTION", tmpElements);
        //   throw "new";
        //   return;
        // }

        let tempAttr = {
          id: el.id,
          layer: layer.name,
          name: el.element,
          rarity: el.wt,
        };

        // BROWN RESTRICTION
        // if (brownRestriction["mouth"][mouthElement.name])
        const first = {
          name: "default",
          ...tmpElements.filter((x) => x.layer == "mouth")[0],
        };

        const brown =
          brownRestriction["mouth"][first.name] &&
          { eyewear: true, clothing: true, headgear: true, earrings: true }[
            layer.name
          ];
        if (!brown) tmpElements.push(tempAttr);
        else {
          console.log("BROWN RESTRICTION DETECTED!");
          console.log(first);
        }
      } else {
        console.log(layer.name, num);
      }
    });

    // console.log(" ");

    const type = checkRarity(tmpElements);
    // if (type == "rare")
    // console.log(_class);

    // RED RESTRICTION
    // tmpElements -> true
    const first = tmpElements.filter((x) => x.layer == "mouth")[0];
    const second = tmpElements.filter((x) => x.layer == "holding")[0];
    const red =
      redRestriction["mouth"][first.name] &&
      redRestriction["holding"][second.name];
    if (red) {
      console.log("RED RESTRCTION DETECTED!");
      console.log(first);
      console.log(second);
    }

    if (totalAmount[type] < totalSupply[_class][type] && !red) {
      // console.log("RARE!!!!          ", totalSupply[_class][type]);

      // console.log(type);
      totalAmount[type] = Number(totalAmount[type]) + 1;
      initialMetaData.push([
        { id: 1, layer: "base", name: "base", rarity: "0" },
        ...tmpElements,
      ]);
      const tmpObj = {
        rarity: type,
        elements: tmpElements,
      };
    }

    console.log(totalAmount, type);
    // console.log();

    tmpElements = [];
    mouthElement = null;
    // console.log(totalSupply[_class]);
    if (
      totalAmount["common"] >= totalSupply[_class]["common"] &&
      totalAmount["uncommon"] >= totalSupply[_class]["uncommon"] &&
      totalAmount["rare"] >= totalSupply[_class]["rare"] &&
      totalAmount["superrare"] >= totalSupply[_class]["superrare"] &&
      totalAmount["legendary"] >= totalSupply[_class]["legendary"]
    )
      break;
  } while (1);

  // console.log(initialMetaData);
};

const checkRarity = (_attributes) => {
  // console.log("ATTRIBUTES", _attributes);
  let rarity = 0;
  _attributes.map((el) => {
    if (el.layer == "background") {
      const tmp = background.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "eye") {
      const tmp = eye.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "mouth") {
      const tmp = mouth.filter((x) => x.element == el.name);

      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "fur") {
      const tmp = fur.filter((x) => x.element == el.name);

      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "holding") {
      const tmp = holding.filter((x) => x.element == el.name);

      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "eyewear") {
      const tmp = eyewear.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "clothing") {
      const tmp = clothing.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "headgear") {
      const tmp = headgear.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
    if (el.layer == "earring") {
      const tmp = earring.filter((x) => x.element == el.name);
      rarity += Number(tmp[0]["wt"]);
    }
  });

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

const createMetaData = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {
    if (err == null || err.code === "ENOENT") {
      fs.writeFileSync(
        `${buildDir}/${metDataFile}`,
        JSON.stringify(metadata, null, 2)
      );
    } else {
      console.log("Oh no, error: ", err.code);
    }
  });
};

module.exports = { buildSetup, createFiles, createMetaData };
