# Zeunerts Tracker - Collective tracker for Zeunerts Julmust/Påskmust

This project is intended for learning, and is a first rewrite of the first application I created in React

### I am fully aware that there are better practices, and I'm happy to recieve constructive criticism.

### To run the app:

1. Clone app
2. Create a MongoDB project.
3. Create a 'config.js' file in ./config/, enter:

```
module.exports = {
  mongoURI:
    "mongo-uri",
  mapsAPI: "maps-api"
};
```

Make sure config is set up correctly, then run:

```
npm install
npm run dev
```

## Heroku deployment

The root directory package.json contains a script called "heroku-postbuild", which simplifies the process. Simply deploy to heroku and the postbuild script will run, compiling a client build.
