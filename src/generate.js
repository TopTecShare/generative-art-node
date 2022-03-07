const fs = require("fs");
const console = require("console");
const { layersOrder } = require("./config.js");

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/`;
const metaDataaFile = '_allMetadata.json';
const layersDir = `${process.env.PWD}/layers`;

let requirements = [
    ["Black Background", "*W", "Black Back Right", "*W", "Sphere", "*W", "*W", "Black Top"],
    ["Black Background", "Black Back Left", "*W", "Black Bottom", "Sphere", "*W", "*W", "*W"],
    ["Black Background", "*W", "*W", "-W", "Sphere", "Black Front Left", "Black Front Right", "*W"],
    ["White Background", "*B", "Black Back Right", "*B", "Sphere", "*B", "*B", "Black Top"],
    ["White Background", "Black Back Left", "*B", "Black Bottom", "Sphere", "*B", "*B", "*B"],
    ["White Background", "*B", "*B", "-B", "Sphere", "Black Front Left", "Black Front Right", "*B"],
    ["Black Background", "*W", "White Back Right", "*W", "Sphere", "*W", "*W", "Black Top"],
    ["Black Background", "Black Back Left", "*W", "White Bottom", "Sphere", "*W", "*W", "*W"],
    ["Black Background", "*W", "*W", "-W", "Sphere", "Black Front Left", "White Front Right", "*W"],
];
let metadata = [];
let attributes = [];

const addAttributes = (_layer, _name) => {
    let tempAttr = {
        layer: _layer
    }
    attributes.push(tempAttr);
}

const addMetadata = attributes => {
    let tempMetadata = {
        attributes: attributes,
    };
    metadata.push(tempMetadata);
    console.log(tempMetadata);
    attributes = [];
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const generate = async () => {
    let [l] = [requirements[0]];
    for (let i in l) {
        let result = [];
        for (let j of requirements) {
            if (j[i][0] === "*") {
                for (let k of getFileNames(layersOrder[i].name, j[i][1])) {
                    let [m] = [j];
                    m[i] = k.split(".")[0]
                    result.push(m)
                }
            } else if (j[i][0] === "-") {
                let k = shuffleArray(getFileNames(layersOrder[i].name, j[i][1]))[0]
                let [m] = [j];
                m[i] = k.split(".")[0]
                result.push(m)

            }
            else result.push(j)
        }
        requirements = JSON.parse(JSON.stringify(result))

    }

    let obj = requirements.map(item => item.map((value, index) => { return { id: index, layer: layersOrder[index].name, name: value } }))
    console.log(obj)
    console.log(obj.length)
    return obj
}

const getFileNames = (name, color) => {
    return fs
        .readdirSync(`${layersDir}/${name}/`)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .filter((item) => /(Wire)+/g.test(item))
        .filter((item) => color === "B" ? /(Black)+/g.test(item) : /(White)+/g.test(item))

}

generate()
module.exports = { generate };