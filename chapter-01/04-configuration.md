# Configuration

- Currently we are invoking `webpack` in the `package.json` and giving it the configuration as command-line arguments.
- Good for small invocations
- Gets messy later on
- Let's create a Webpack configuration file
- Create `webpack.config.js` in your project root
- Add this code into it:
  ```js
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  ```
  - notes:
    - why are we using `require('path')` and not `import path from 'path'`?
    - remember, we can not use `import` without having to compile/transpile the code into something the environment understands
    - so we're forced to use the Node _CommonJS_ module syntax, but don't worry about it for now
    - we import `path` because of the `path.resolve` function to get an _absolute path_ to where we want the bundle to be put
    - `__dirname` is a special Node.js runtime variable that contains the path to the directory where the script is run
    - `path.resolve(__dirname, 'dist')` is used to put `__dirname` and `dist` together into a _absolute path_, resulting in (my case) a path `/Users/stefan.rimaila/Projects/handyman-work/dist`
    - Absolute paths are not required, but it's recommended to use absolute paths when specifying a target location where you wish your compiled code to be copied
- Then, change your `package.json` file again:
  ```diff
   {
     "name": "handyman-work",
     "version": "1.0.0",
     "main": "index.js",
     "author": "Stefan Rimaila <stefan@rimaila.fi>",
     "license": "MIT",
     "scripts": {
  -    "start": "webpack --mode development src/index.js"
  +    "start": "webpack --config webpack.config.js"
     },
     "devDependencies": {
       "webpack": "^4.16.5",
       "webpack-cli": "^3.1.0"
     }
   }
  ```
- run `yarn start` again:
  ```
  yarn run v1.9.2
  $ webpack --config webpack.config.js
  Hash: efe8aee648ce8c2125d8
  Version: webpack 4.16.5
  Time: 172ms
  Built at: 15/08/2018 15:18:21
    Asset      Size  Chunks             Chunk Names
  main.js  53.2 KiB    main  [emitted]  main
  Entrypoint main = main.js
  [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 489 bytes {main} [built]
  [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
  [./src/index.js] 45 bytes {main} [built]
      + 6 hidden modules
  ✨  Done in 1.44s.
  ```
- and it should still work just fine: `node dist/main.js`
- finally, make sure you commit your changes; `git add . && git commit -m "Add Webpack configuration"`
