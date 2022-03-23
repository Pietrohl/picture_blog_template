/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('post_likes', function (table) {
        table.increments('id');
        table.integer('post_id').unsigned().notNullable();
        table.integer('author_id').unsigned().notNullable();
        table.foreign('author_id').references('id').inTable('user').onDelete('CASCADE');
        table.foreign('post_id').references('id').inTable('post').onDelete('CASCADE');
        table.primary(['post_id', 'author_id']);
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('post_likes')

};
