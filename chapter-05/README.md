---
title: Operating on lists
---

# Operating on lists

  - Operating on lists
  - Common list operations
    - `head`
    - `last`
    - `tail`
    - `init`
    - `uncons`
    - `length`
  - List transformations
    - `reduce`
    - `map`
    - `filter`
    - `transpose`
  - Sublists
    - `take`
    - `takeEnd`
    - `takeWhile`
    - `takeWhileEnd`
    - `drop`
    - `dropWhile`
    - `dropEnd`
    - `dropWhileEnd`
    - `splitAt`
    - `splitEvery`
  - Creating new lists
    - `range`
    - `repeat`
    - `empty`

## `head`

Write a function that returns the first element from the list given to it.

```js
const xs = [1, 2, 3];
const x = head(xs);
console.log(x); // => 1
```

## `last`

Write a function that returns the last element from the list given to it.

```js
const xs = [1, 2, 3];
const x = last(xs);
console.log(x); // => 3
```

## `tail`

Write a function that returns a new list, but without the first element in the given list.

```js
const xs = [1, 2, 3];
const ys = tail(xs);
console.log(ys); // => [2, 3]
```

## `init`

Write a function that return a new list, but without the last element in the given list.

```js
const xs = [1, 2, 3];
const ys = init(xs);
console.log(ys); // => [1, 2]
```
