const express = require('express');
const db = require('./database/dataAccessHelpers');
const server = express();
const PORT = 5555;
const projectsAPIURL = '/api/projects';
const actionsAPIURL = '/api/actions';

server.use(express.json());

//====== PROJECTS ENDPOINTS ======//
server.get(projectsAPIURL, (req, res) => {
  db.getProjects()
    .then(projectsArray => {
      res.json(projectsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    });
});

server.get(`${projectsAPIURL}/:id`, (req, res) => {
  const { id } = req.params;
  db.getProjectById(id)
    .then(project => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    });
});

server.post(projectsAPIURL, (req, res) => {
  const { name, description } = req.body;
  db.postProject({ name, description })
    .then((newProjectId) => {
      res.json(newProjectId);
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    });
});

//====== ACTIONS ENDPOINTS ======//
server.post(actionsAPIURL, (req, res) => {
  const { project_id, description, notes } = req.body;
  db.postAction({ project_id, description, notes })
    .then((newActionId) => {
      res.json(newActionId);
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    });
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
