const express = require('express');
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
  res.send('SINGLE PROJECT');
});

server.post(projectsAPIURL, (req, res) => {
  res.send('POSTED PROJECT');
});

//====== ACTIONS ENDPOINTS ======//
server.post(actionsAPIURL, (req, res) => {
  res.send('POSTED ACTION');
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
