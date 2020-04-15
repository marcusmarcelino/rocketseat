const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    title, 
    url, 
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  let repository = repositories[repositoryIndex];

  if(repositoryIndex < 0){
    return response.status(400).json({ error : "Repository not found!"});
  }
  
  repository = {
    id,
    title, 
    url, 
    techs,
    likes: repository.likes
  }; 

  repositories[repositoryIndex] = repository;

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  }
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const repository = repositories[repositoryIndex];

  if(repositoryIndex < 0){
    return response.status(400).json({ error : "Repository not found!"});
  }

  repository.likes += 1;

  return response.json(repository)
});

module.exports = app;