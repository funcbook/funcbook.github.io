---
type: page_overview
---
# Unit tests

## Testable functionality

- Testing code
  - Tests are not mandatory (but they should be)
  - Always in your way
  - But helps managing sanity levels
- Configuring tests
  - Install and configure `ava`
  - Add script for testing
  - Watch mode
- Code coverage
  - To 100% or not to 100%
  - Realistic expectations
- Generally about testing
  - Code that's hard to test
    - is fragile code
    - is hard to understand
    - is difficult to reason about
    - causes confusing problems later on through unexpected bugs
  - don't write clever code
    - write clean and good code
    - “Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.” - Brian W. Kernighan
  - write tests early
    - make your life easier in the long run
- CHECKPOINT

---

## Setting up unit testing

- install `ava`; `yarn add ava -D -E`
  - `-D` means `--dev`, `-E` means `--exact` (`npm`'s equiv. of `--save-exact`)
- add `test` script to `package.json`; `"test": "ava"`
- create `test/index.js` and add this to it:
  ```js
  import test from 'ava';

  test('this is a passing test', t => {
    t.pass();
  })
  ```
- sweet, now, let's write a basic function and a test for it
- empty your `src/index.js` and put this in it:
  ```js
  export const add = (a, b) => a + b;
  ```
- empty your `test/index.js` file and add this:
  ```js
  import test from 'ava';
  import { add } from '../src/index';

  test('add(a, b)', t => {
    t.is(add(1, 2), 3);
  });
  ```
- rerun your tests
- again? it doesn't work?
  - short intro to babel and why is it needed now when we have webpack