const { hashSync } = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("admin").del();
  await knex("admin").insert([
    {
      // id: 1,
      username: "Saidqodirxon",
      password: hashSync("realcoderuz", 10),
    },
    {
      // id: 2,
      username: "Muhammadjon",
      password: hashSync("7701", 10),
    },
  ]);
};
