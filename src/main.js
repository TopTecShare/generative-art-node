const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const reader = require("xlsx");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");

const { layersOrder, format, rarity, numberToProduce } = require("./config.js");
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
} = require("./attribute");

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

// console.log(numberToProduce);

// const sss = () => {
//   const layers = layersSetup(layersOrder);

//   layers.map((layer) => {
//     layer.elements.map((el) => {
//       if (layer.name == "earring") {
//         console.log(el.name);
//         const tmp = earring.filter((x) => x.element == el.name);
//         console.log(tmp);
//         Number(tmp[0]["wt"]);
//       }
//     });
//   });
// };

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

const drawLayer = async (_layer, _edition) => {
  const rand = Math.random();
  let element = _layer.elements[Math.floor(rand * _layer.number)]
    ? _layer.elements[Math.floor(rand * _layer.number)]
    : null;
  if (element) {
    let random = Math.floor(Math.random() * 100);
    // const random = 80;
    const layer = getLayerOrder(element.fileName);
    // console.log(element.fileName, getLayerOrder(element.fileName));
    if (
      layer < 6 ||
      (layer == 6 && random >= 40) ||
      (layer == 7 && prevOpt == layer - 1 && random >= 70) ||
      (layer == 8 && prevOpt == layer - 1 && random >= 85) ||
      (layer == 9 && prevOpt == layer - 1 && random >= 95)
    ) {
      prevOpt = layer;
      addAttributes(element, _layer);
      isFirstOptional = true;
      const image = await loadImage(`${_layer.location}${element.fileName}`);

      ctx.drawImage(
        image,
        _layer.position.x,
        _layer.position.y,
        _layer.size.width,
        _layer.size.height
      );
      saveLayer(canvas, _edition);
    }
  }
};

const createFiles = async (edition) => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
  for (let i = 1; i <= edition; i++) {
    await layers.forEach(async (layer) => {
      await drawLayer(layer, i);
    });

    console.log(attributes);
    const rarity = await checkRarity(attributes);
    prevOpt = 0;

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

const checkRarity = (attributes) => {
  let rarity = 0;
  attributes.map((el) => {
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

  if (rarity > 55 && rarity < 200) return "Common";
  if (rarity > 201 && rarity < 400) return "Uncommon";
  if (rarity > 401 && rarity < 850) return "Rare";
  if (rarity > 851 && rarity < 1000) return "Superrare";
  if (rarity > 1001 && rarity < 1597) return "Legendary";
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
