/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('comment', function (table) {
        table.integer('author_id').unsigned().notNullable();
        table.integer('post_id').unsigned().notNullable();
        table.integer('parent_comment_id')
        table.increments('id')
        table.text('content')
        table.date('date')
        table.foreign('author_id').references('id').inTable('user').onDelete('CASCADE');
        table.foreign('post_id').references('id').inTable('post').onDelete('CASCADE');

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comment')

};
