/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');


class User {
  constructor() {
    this.email = faker.internet.email()
  }
}

const mockUsers = [];

let i = 0;
while (i < 10) {
  mockUsers.push(new User())
  i++;
}


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert(mockUsers);
};
