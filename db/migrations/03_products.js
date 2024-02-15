/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();

    table.text("uz_product_name").notNullable();
    table.text("ru_product_name").notNullable();
    table.text("en_product_name").notNullable();

    table.text("uz_desc");
    table.text("ru_desc");
    table.text("en_desc");

    table.integer("img_id").references("id").inTable("images").unique();

    // table.integer("img1_id").references("id").inTable("images").unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
