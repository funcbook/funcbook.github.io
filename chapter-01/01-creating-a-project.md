---
title: Creating a project
---
# Creating a project

First off, create a new Node project and a repository for it. A Github repo isn't required, as it can entirely be worked on locally, however it's a good idea to store your code outside of your computer as well, in case something wonky happens.

For the purposes of this book, I'll call the project `handyman`. You're free to pick any name you like to it (can be anything that you like, library names don't have set rules to what is good and what is bad), but any time "handyman" is mentioned, it will refer to this project by default.

- create project whereever you like
- recommended to have a directory named "Code" or "Projects", where all your projects live in their own directories
- you will remember more easily where your projects are located, especially when working in the command-line
- protip:

```sh
mkdir -p ~/Projects/handyman-kit
```

## The anatomy of a project

- these are just a set of best practices acquired throughout doing things, YMMV
- the _project root_ is where `package.json`, `.gitignore` and other project top-level related things are located
- a folder for the application source: `src/`
- a folder for the application tests: `test/`

### Initializing a new project

```sh
yarn init -y
```

- Creates a `package.json` file with default configuration (version, name, author)

### Creating a git repository

- In the project folder:
  ```sh
  git init
  ```
- Add default gitignore
  ```sh
  echo "node_modules/" > .gitignore
  git add package.json .gitignore
  git commit -m "First commit!"
  ```

You should now have a base project which you can start building your project on.
