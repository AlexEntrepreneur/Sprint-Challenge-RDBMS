const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const Projects = db('projects');
const Actions = db('actions');

function intToBoolean(integer) {
  return integer ? true : false;
}

function nullToString(nullValue) {
  return nullValue ? nullValue : '';
}


module.exports = {
  getProjectById: (idParam) => {
    return (
      Projects
        .leftJoin('actions', 'projects.id', 'actions.project_id')
        .where('projects.id', idParam)
    )
  },
  getActionsByPojectId: (id) => {
    return (
      Actions
        .where('project_id', id)
    )
  },
  postProject: (project) => {
    return Projects.insert(project)
  },
  postAction: (action) => {
    return Actions.insert(action)
  }
};
