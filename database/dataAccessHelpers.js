const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const Projects = db('projects');
const Actions = db('actions');

function intToBoolean(integer) {
  return integer ? true : false;
}

function nullToEmptyString(nullValue) {
  return nullValue ? nullValue : '';
}

function formatProjectsObject(project) {
  if (!project.completed) {
    return {
      ...project,
      completed: intToBoolean(project.completed),
      description: nullToEmptyString(project.description)
    }
  }
}

function formatActionsArray(actionsArray) {
  if (actionsArray.length) {
    return actionsArray.map((action) => {
        return {
          ...action,
          completed: intToBoolean(action.completed),
          description: nullToEmptyString(action.description),
          notes: nullToEmptyString(action.notes)
        }
    })
  }
  return [];
}

function formatProjectsArray(projectsArray) {
  if (projectsArray.length) {
    return projectsArray.map((project) => {
        return {
          ...project,
          completed: intToBoolean(project.completed),
          description: nullToEmptyString(project.description)
        }
    })
  }
  return [];
}

module.exports = {
  getProjects: function() {
    return Projects.select('*')
    .then(projectsArray => {
      return formatProjectsArray(projectsArray);
    });
  },
  getProjectById: function(idParam) {
    const projectsQuery = Projects.select('*').where('projects.id', idParam).first();
    const actionsQuery = this.getActionsByPojectId(idParam);
    const promises = [projectsQuery, actionsQuery];

    return (
      Promise.all(promises)
        .then((results) => {
          let [project, actions] = results;
          if (project) {
            const formattedProject = formatProjectsObject(project);
            formattedProject.actions = formatActionsArray(actions);
            return formattedProject;
          }
          throw `Can\'t find project of id ${idParam}`;
        })
    )
  },
  getActionsByPojectId: (id) => {
    return (
      Actions
        .select('*')
        .where('project_id', id)
    )
  },
  postProject: (project) => {
    return Projects.insert(project)
    .then(newProjectId => {
      return newProjectId[0];
    });
  },
  postAction: (action) => {
    return Actions.insert(action)
    .then(newActionId => {
      return newActionId[0];
    });
  }
};
