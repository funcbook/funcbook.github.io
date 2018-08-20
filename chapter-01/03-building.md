---
title: Building your module
---

Because we want to be able to use modules in code that will be used in environments not supporting them, we'll have to add an intermediate step to transform our code into a format that the browser can use, through something called _bundling_.

At its core, bundling is taking your code, resolving any modules used in that code, and merging all the resulting required code into a single file. In reality, it's a little bit more technical than that, but it's not important to go through right now.

Setting up bundling used to be a type of black magic in itself, but luckily module bundlers have evolved quite a bit.

## Just for bundling?

Even though it's called _bundling_, it's not _only bundling_. There are a number of things that can be performed that will transform (or compile) the code—or target a certain JavaScript version—to allow it to be run in an specific environment, much in the same way as creating a native application in Windows or macOS allows the compiler to translate the code into such that can be run on the specified platform. Not everything works because there are some limitations, but for the most parts things work quite well.

- _mention ES language features that haven't been finalized yet_

## Setting up bundling

There are a number of bundlers that are used in JavaScript projects, where all of them allow a lot of customization to the process through the use of plugins.

Popular bundlers include:

- grunt
- gulp
- rollup
- webpack
- fusebox

For this project, we will be using Webpack, as its used in a lot of other projects. Webpack's inner workings have evolved quite a bit and it has the reputation of making quantum mechanics look easy in comparison, but luckily this is not the case anymore.

Start by installing `webpack` and its command-line utility `webpack-cli`:

```sh
yarn add webpack webpack-cli --dev
```

> **NB** the ``--dev` flag means the installed dependencies are marked as `devDependencies`, which means that they will not be bundled or distributed with your module.

To be able to use `webpack`, perform the following change to your `package.json` file:

```diff
  {
    "name": "handyman-work",
    "version": "1.0.0",
    "main": "index.js",
    "author": "Stefan Rimaila <stefan@rimaila.fi>",
    "license": "MIT",
+   "scripts": {
+     "start": "webpack src/index.js"
+   },
    "devDependencies": {
      "webpack": "^4.16.5",
      "webpack-cli": "^3.1.0"
    }
  }
```

You have now set up bundling for your code. We'll look into the bundling step in some more detail later on, but for now, take it to a test run.

## Test drive

To run commands specified in `package.json`, the only thing you need to do is:

```sh
yarn run start
```

Where `start` is the name of the script to be run.

> **NB** Both `yarn` and `npm` come with shorthands for a set of commonly used scripts. `start`, `install` and `publish` to name a few allow you to omit the `run` command and simply run `yarn start`.

Running `yarn start` should yield output which should look similar to the output below. Don't mind any possible warnings at this point.

```
~/P/handyman-work ❯❯❯ yarn start
yarn run v1.9.2
$ webpack src/index.js
Hash: 116e26ab2942443dcf10
Version: webpack 4.16.5
Time: 189ms
Built at: 15/08/2018 14:47:21
  Asset    Size  Chunks             Chunk Names
main.js  13 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 45 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
[4] (webpack)/buildin/global.js 489 bytes {0} [built]
    + 6 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
✨  Done in 1.67s.
```

If the process ran successfully, you should now have a `dist` folder that contains the file `main.js`. This is your newly created bundle — congratulations! 🍭　

## Test drive, part 2

Test your newly created bundle, but instead of running `node src/index.js`, run `node dist/main.js` — and lo and behold, it works!

```
{ url:
  { parse: [Function: b],
    resolve: [Function],
    resolveObject: [Function],
    format: [Function],
    Url: [Function: s] } }
```

Take a look into the newly built bundle. Don't get scared if it looks garbled; this is what the warning Webpack gave you relates to. Since `webpack` was run without it given the `mode` option, it defaults to creating a production-ready bundle. This means that the code will have a number of additional optimization steps performed to it, of which the most visible part is that the resulting source code has been minified. Let's fix this first.

Make the following change to your `package.json`:

```diff
  {
    "name": "handyman-work",
    "version": "1.0.0",
    "main": "index.js",
    "author": "Stefan Rimaila <stefan@rimaila.fi>",
    "license": "MIT",
    "scripts": {
-     "start": "webpack src/index.js"
+     "start": "webpack --mode development src/index.js"
    },
    "devDependencies": {
      "webpack": "^4.16.5",
      "webpack-cli": "^3.1.0"
    }
  }
```

Now run `yarn start` again, and you will notice the warning has disappeared. Open the resulting bundle file again in your editor, and you will see a big difference.

But there's a lot of... _stuff_. A ton of it in fact. It seems like the code you wrote is just a small fraction of the resulting bundle, which for the moment being is entirely accurate. The rest of the code the bundle includes is Webpack's own internal logic that's required for your code to work, which takes care of doing the "importing" and ensuring that code is evaluated in the correct order for it to work. In most cases, every bundle you create will contain a copy of that code.

Just in case, verify that the new bundle still work by running `node dist/main.js` again.

## Finishing up

Now you have a working pipeline for bundling your code so that it works like it should. What seems like it was a lot of work to get anything running without errors, will for the most part fade into the background from now on, only requiring you to make minor changes or adding extra options for the bundling process.

In the next section, we will look into creating a bundling configuration and use that instead of specifying all the bundling options in the `package.json` script.

But before you move on, though, be sure to commit your changes!

```sh
git add .
git commit -m "Add code compiling"
```

```
[master 94683a6] Add code compiling
  4 files changed, 2728 insertions(+), 1 deletion(-)
  create mode 100644 dist/main.js
  create mode 100644 src/index.js
  create mode 100644 yarn.lock
```
