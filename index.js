const express = require('express');
const db = require('./database/dataAccessHelpers');
const server = express();
const PORT = 5555;
const projectsAPIURL = '/api/projects';
const actionsAPIURL = '/api/actions';

server.use(express.json());

//====== PROJECTS ENDPOINTS ======//
server.get(projectsAPIURL, (req, res) => {
  res.send('PROJECTS API');
});

server.get(`${projectsAPIURL}/:id`, (req, res) => {
  // res.send('SINGLE PROJECT');
  const { id } = req.params;
  db.getProjectById(id)
    .then(project => {
      res.json(project)
    })
    .catch((err) => {
      res.status(404).json({
        message: `Something went wrong: ${err}`
      })
    })
});

server.post(projectsAPIURL, (req, res) => {
  db.postProject()
    .then((affectedFieldsInt) => {
      res.send(affectedFieldsInt)
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    })
});

//====== ACTIONS ENDPOINTS ======//
server.post(actionsAPIURL, (req, res) => {
  db.postAction()
    .then((affectedFieldsInt) => {
      res.send(affectedFieldsInt)
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong: ${err}`
      })
    })
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
