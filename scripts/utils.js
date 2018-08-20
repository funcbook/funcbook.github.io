const path = require('path');
const fs = require('fs');
const R = require('ramda');
const L = require('partial.lenses');

const undef = R.always(undefined);

const directoryPattern = /(chapter-)?(\d)+/i;

const indexFile = 'README.md';

const seq = (x, ...fns) => R.pipe(...fns)(x);

const show = R.tap(x => console.log(x));

const resolveToPath = R.curry((b, p) => path.resolve(b, p));
const resolve2 = R.curryN(2, path.resolve);

const mkRegexp2 = R.constructN(2, RegExp);
const mkFlaggedRegexp = R.flip(mkRegexp2);

const isDirectory = p => fs.statSync(p).isDirectory();

const readDir = fs.readdirSync;

const read1 = R.unary(fs.readFileSync);

const headingPattern = /^(#+)/;
const isHeading = R.test(headingPattern);
const cleanupHeading = R.replace(/^(?:#+\s)(.*)/, '$1');

//

const indentN = R.compose(R.join(''), R.repeat('  '));

const listItemN = (level, title) =>
  R.pipe(R.prepend('- '),
         R.prepend(indentN(R.dec(level))),
         R.join(''))(title);

const getHeadingLevel =
  R.when(R.test(headingPattern),
         R.pipe(R.match(headingPattern),
                R.head,
                R.length));

const headingAsList =
  R.ifElse(isHeading,
           R.pipe(R.unless(R.is(Array), R.of),
                  R.ap([getHeadingLevel, cleanupHeading])),
           R.always(undefined));

//

const getIndex =
  R.pipe(R.flip(resolve2)('README.md'),
         read1,
         R.toString,
         R.split('\n'));

const getResolvedDirectories =
  R.pipe(readDir,
         R.filter(isDirectory),
         R.filter(R.test(directoryPattern)),
         R.map(resolveToPath('.')));

//

const getHeadings =
  R.pipe(R.map(R.pipe(R.of, headingAsList)),
         R.filter(R.identity));

const getHeadingList =
  R.map(R.pipe(R.apply(listItemN)));

//

module.exports = {
  getResolvedDirectories,
  getIndex,
  getHeadings,
  getHeadingList,
};
