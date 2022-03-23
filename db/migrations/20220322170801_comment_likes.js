/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('comment_likes', function (table) {
        table.increments('id');
        table.integer('comment_id').unsigned().notNullable();
        table.integer('author_id').unsigned().notNullable();
        table.foreign('author_id').references('id').inTable('user').onDelete('CASCADE');
        table.foreign('comment_id').references('id').inTable('comment').onDelete('CASCADE');
        table.primary(['comment_id', 'author_id']);

    })

};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comment_likes')

};
