# The nagging linter

- let's use `eslint`
- setting up the linter is a bit of an idiotic process at the moment
- how to event `eslint --init`?

## Setting up

- in your project root folder, run `yarn add eslint --dev` (or `npm install eslint --save-dev`)
- after `eslint` has been added, run `./node_modules/.bin/eslint --init`
- first, choose "_Use a popular style guide_", and choose "_Airbnb_"
- next: "_Do you use React?_", answer `No`
- for the question "_What format do you want your config file to be in?_" answer "_JavaScript_"
- if you get a question about installing missing peer dependencies for `eslint-config-airbnb-base@latest` or anything else, answer `Y`

## Add a linting script

modify the `scripts` part of your `package.json` as follows

```diff
   "scripts": {
-    "start": "webpack --config webpack.config.js"
+    "start": "webpack --config webpack.config.js",
+    "lint": "eslint src/"
   },
```

- now you can run `yarn lint` or `npm run lint` to run the linting script
- remember to install a plugin to your code editor to also support linting
