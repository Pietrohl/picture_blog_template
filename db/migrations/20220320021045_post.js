/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('post', function (table) {
        table.increments('id')
        table.string('image_url', 255).notNullable()
        table.string('image_placeholder', 510).notNullable()
        table.string('title', 255).notNullable()
        table.date('date').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('post')
};
