// build your `Task` model here
const db = require('../../data/dbConfig')

function find() {
    return db('tasks');
  }

function getTasks() {
    return db('tasks as t')
      .leftJoin(
        'projects as p',
        'p.project_id',
        't.project_id'
        )
      .select(
        't.task_id',
        't.task_description',
        't.task_notes',
        't.task_completed',
        'p.projects_name',
        'p.project_description'
    )
}

function findById(task_id) {
    return db('tasks').where('task_id', task_id)
}

// async function create(task) {
//     const [id] = await db('tasks').insert(task)
//     return findById(id)
// }

const create = async (task) => {
  return db('tasks').insert(task)
  .then(([id]) => {
    return findById(id)
  })
}
  
module.exports = {
    getTasks,
    findById,
    create,
    find
}