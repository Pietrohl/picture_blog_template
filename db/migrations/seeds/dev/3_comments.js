/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

class Comment {

  constructor(parent_comment_id, post_id) {
    this.parent_comment_id = Number(parent_comment_id)
    this.author_id = Math.ceil(10 * Math.random())
    this.post_id = post_id ? post_id : Math.ceil(100 * Math.random())
    this.date = faker.time.recent()
    this.content = faker.lorem.text()
  }
}
const mockComments = [];

let i = 0;
while (i < 100) {

  i++;
  const commentId = (Math.floor(10 * Math.random()) < 2) && Math.ceil(i * Math.random())
  let post_id = null
  if (commentId)
    post_id = !!commentId && mockComments[commentId - 1]?.post_id

  mockComments.push(new Comment(commentId, post_id))
}

exports.seed = async function (knex) {

  // Deletes ALL existing entries
  await knex('comment').insert(mockComments);
};
