// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db('projects')
}

function getById(project_id) {
    return db('projects')
    .where('project_id', project_id)
    .then(project => {
        return project[0]
    })
}

function create(project) {
    return db('projects')
    .insert(project)
    .then(project => {
        return getById(project[0])
    })
}

// function create(project_id, project) {
//     return db('projects').insert({
//         ...project,
//         project_id
//     })
//     .then(() => {
//         return db('projects').where('project_id', project_id)
//     })
// }

module.exports = {
    getProjects,
    getById,
    create
}