/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments("id").primary();
    table.text("title_uz").notNullable();
    table.text("title_ru").notNullable();
    table.text("title_en").notNullable();

    table.text("desc_uz").notNullable();
    table.text("desc_ru").notNullable();
    table.text("desc_en").notNullable();

    // table.integer("img_id").references("id").inTable("images").unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
