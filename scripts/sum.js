const fs = require('fs');
const path = require('path');
const remark = require('remark');
const frontmatter = require('remark-frontmatter');
const S = require('sanctuary');
const R = require('ramda');
const L = require('partial.lenses');

const {
  statSync,
  readFileSync,
} = fs;

const inpath = path.resolve(process.cwd());

const isDirectory = p => statSync(p).isDirectory();

const infile = path.resolve(process.cwd(), 'chapter-01', 'README.md');
const content = readFileSync(infile).toString();

const show = R.tap(x => console.log(x));

const node = remark().use(frontmatter, ['yaml']).parse(content);

// 1. Preparation

// These are the properties we are only interested in in the results
const props = L.props('type', 'value', 'children', 'depth');

// Define a recursive traversal that collects any AST node that is a heading,
// otherwise if the current node has children, process them with the same logic
// as this one.
//
// Otherwise, throw the node away.
const traversal =
  L.lazy(rec => L.cond([R.propEq('type', 'heading'), [props]],
                       [R.has('children'), ['children', L.children, rec]],
                       [L.zero]))

// Define a template for how the resulting heading items should be structured
const headingL =
  L.pick({ type: 'type',
           text: ['children', L.first, 'value'],
           depth: 'depth' });

// And finally, collect all nodes that the recursive traversal returns,
// after which the results will be transformed into the specified template structure.
// const result = L.collect([traversal, headingL], node);
const result = L.get([], node);

// ==========
// Processing

//    mkItemIndent :: Item -> String
const mkItemIndent =
  S.pipe([S.prop('depth'),
          R.repeat('  '),
          S.joinWith('')]);

// Creates a single list item
//    createItem :: Item -> String
const createItem =
  S.pipe([S.of(Array),
          S.ap([mkItemIndent,
                S.K('- '),
                S.prop('text')]),
          S.joinWith('')]);

//    createToc :: Array Item -> String
const createToc =
  S.pipe([S.map(createItem),
          R.unnest,
          S.unlines]);

//

//    createLink :: String -> String -> String
const createLink = title => url => `[${title}](${url})`;

//

// const toc = createToc(result);
const toc = result;

console.log(toc);
