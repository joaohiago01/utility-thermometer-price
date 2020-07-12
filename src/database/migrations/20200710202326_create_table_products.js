
exports.up = function (knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('price', 4, 2).notNullable();
        table.text('image').notNullable();
        table.string('utility');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
