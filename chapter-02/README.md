# Writing code

## Getting started

- code compiling and bundling now works
- let's write some code
- first, about coding style

## Code style

- code style is important
- much more so if working with other people
- aim is to publish a module to `npm`
- other people will most likely be looking through your code
- maybe even contribute
- code style becomes important
- pay attention from the start, easier in the long run
- what is code style then?

## What is code style?

- set of conventions and agreed upon rules
- here's what we'll start with
- we won't enforce this in any way right now
- but we will start ensuring and enforcing a consistent code style later on (you'll see)
- goal is to start off with simple best practices for our code
- keep doing it in the same style throughout
- less maintenance work down the road

## Code style rules

- let's define some basic rules—or _laws_-even
  - indentation size should be _two (`2`) spaces_
    - configure your editor, or use `.editorconfig`
      ```ini
      [*.js]
      indent_size = 2
      indent_style = space
      ```
  - separate each definition, be it a variable, constant or function, with an empty line
  - add semicolons to the end of your statements
    - first learn to insert them yourself, before having to consider JS' implicit semicolon insertion
    - don't worry if you don't insert all semicolons that should be required
    - we will learn about them later on
- some more specific ones
  - expressions over functions
    ```js
    // this
    fn = x => x + 2;

    // over this
    function fn(x) {
      return x + 2;
    }
    ```
  - arrow functions have parens when needed
    ```js
    // this
    fn = x => x + 2;

    // instead of this
    fn = (x) => x + 2;

    // parens are needed for functions taking multiple parameters,
    // or if they specify default values and/or use destruction on parameters
    fn = (x = 2) => x + 2;

    // get the `name` property from the given object
    getName = (x = {}) => x.name;

    // destruct object and only take the `name` property, and return it
    getName = ({ name }) => name;
    ```
  - named exports over default exports
    ```js
    // this
    export const foo = 1;

    export const bar = 2;

    // instead of this
    const foo = 1;
    const bar = 2;

    export default { foo, bar };
    ```
    - we want to be able to `import { foo} from 'handyman';`
    - can't do that without named exports

## what a tl;dr

- take this into consideration and gradually start adjusting your style

## let's write some code