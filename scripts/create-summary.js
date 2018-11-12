#!/usr/bin/env node
const R = require('ramda');
const U = require('./utils');

const dirs = U.getResolvedDirectories(process.cwd());
const indices = R.map(U.getIndex, dirs);

const hs = R.map(U.getHeadings, indices);
const ls = R.map(U.getHeadingList, hs);
const xs = R.zip(dirs, ls);

console.log(JSON.stringify(xs, null, 2));