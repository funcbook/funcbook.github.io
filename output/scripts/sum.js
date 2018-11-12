const fs = require('fs');
const path = require('path');
const remark = require('remark');
const frontmatter = require('remark-frontmatter');
const S = require('sanctuary');
const R = require('ramda');
const L = require('partial.lenses');

const parseFile = require('./md/file');
const createToc = require('./md/item-list');
const getFrontMatter = require('./md/frontmatter');
const getHeadings = require('./md/heading');

const {
  statSync,
  readFileSync,
  readdirSync,
} = fs;

const isDirectory = p => statSync(p).isDirectory();

const infile = path.resolve(process.cwd(), 'chapter-01', 'README.md');
const content = readFileSync(infile).toString();

const chapterRegex = /chapter\-/i;
const inpath = path.resolve(process.cwd());

const directories =
  S.pipe([readdirSync,
          S.filter(isDirectory),
          S.filter(S.test(chapterRegex))])(inpath);

const indices =
  S.pipe([S.map(S.flip(S.concat)('/README.md')),
          S.map(path.resolve)])(directories);

const parsed =
  S.map(S.pipe([R.unary(fs.readFileSync), parseFile]))(indices);

console.log(JSON.stringify(parsed[0], null, 2))

const headings =
  S.map(getHeadings)(parsed);

const results = [indices, headings];

// console.log(createToc(R.unnest(headings)))
