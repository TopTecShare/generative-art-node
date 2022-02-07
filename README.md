# Welcome to Monkey

Important: There is a new repo for this code.
[https://github.com/Baushaus-io/monkey-art-gen](https://github.com/Baushaus-io/monkey-art-gen)

All the code in these repos was created and explained by HashLips on the main YouTube channel.

# generative-art-node

Create generative art by using the canvas api and node js

## Installation

```sh
git clone https://github.com/Baushaus-io/monkey-art-gen

yarn install
```

## Usage

Create your different layers as folders in the 'layers' directory, and add all the layer assets in these directories. Optionally, append '\_r' and '\_sr' to the layer file names to make those layer files rare or super rare respectively.

> Rarity is customizable in `src/config.js`.

Once you have all your layers, go into `src/config.js` and update the `layersOrder` array to be your layer folders name in order of the back layer to the front layer.

_Example:_ If you were creating a portrait design, you might have a background, then a head, a mouth, eyes, eyewear, and then headwear, so your `layersOrder` would look something like this:

```js
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
```

The `name` of each layer object represents the name of the folder (in `/layers/`) that the images reside in. The `number` of each layer object represents the total number of image files you want to select from (possibly including blanks.) For instance, if you have three images in a layer folder and want to pick one of those each time, the `number` should be `3`. If you have a single image in a layer that you want to increase the rarity of to 1 in 100, the `number` for that layer should be `100`. In this case, 99 times out of 100, you will get a completely transparent layer.

Then optionally, update your `format` size, ie the outputted image size, and the defaultEdition, which is the amount of variation outputted.

When you are all ready, run the following command and your outputted art will be in the `build` directory:

```sh
npm run build
```
