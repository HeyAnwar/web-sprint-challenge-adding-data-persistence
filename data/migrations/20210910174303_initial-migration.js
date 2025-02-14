exports.up = async function(knex) {
    await knex.schema
      .createTable('projects', (table) => {
          table.increments('project_id')
          table.string('project_name').notNullable().unique()
          table.string('project_description')
          table.boolean('project_completed').defaultTo(0)
      })
      .createTable('resources', (table) => {
          table.increments('resource_id')
          table.text('resource_name').notNullable().unique()
          table.text('resource_description')
      })
      .createTable('tasks', (table) => {
          table.increments('task_id')
          table.text('task_description').notNullable()
          table.text('task_notes')
          table.boolean('task_completed')
          table.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onDelete('RESTRICT')
      })
      .createTable('project_resources', (table) => {
          table.increments('project_resource_id')
          table.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onDelete('RESTRICT')
          table.integer('resource_id')
          .unsigned()
          .notNullable()
          .references('resource_id')
          .inTable('resources')
          .onDelete('RESTRICT')
      })
  };
  
  exports.down = async function(knex) {
    await knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects')
  };