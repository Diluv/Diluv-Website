const express = require('express');
const games = require('./data/games');
const projectTypes = require('./data/project_types');
const projects = require('./data/projects');
const projectFiles = require('./data/projectFiles');

const app = express();

function returnData(data) {
  return function (req, res) {
    res.send({data: data})
  }
}

// TODO Fix hard code stuff
app.use(express.json());
app.get('/v1/games', returnData(games));
app.get('/v1/games/:gameslug', returnData(games.filter(game => game.slug === "minecraft")[0]));
app.get('/v1/games/:gameslug/types', returnData(projectTypes.filter(game => game.gameSlug === "minecraft")));
app.get('/v1/games/:gameslug/:projecttypeslug', returnData(projectTypes.filter(pt => pt.gameSlug === "minecraft" && pt.slug === 'mods')[0]));

//TODO FIX
app.get('/v1/games/:gameslug/:projecttypeslug/projects', returnData(projects));
app.get('/v1/games/:gameslug/:projecttypeslug/:projectslug', returnData(projects.filter(pt => pt.slug === "bookshelf")[0]));
app.get('/v1/games/:gameslug/:projecttypeslug/:projectslug/files', returnData(projectFiles));


app.listen(8080);
