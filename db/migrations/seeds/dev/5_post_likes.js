/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {
  const likes = []

  while (likes.length < 200) {
    const like = {
      post_id: Math.ceil(100 * Math.random()),
      author_id: Math.ceil(10 * Math.random()),
    }
    if (!likes.some(e => (e.post_id === like.post_id) && (e.author_id === like.author_id)))
      likes.push(like)
  }
  await knex('post_likes').del()
  await knex('post_likes').insert(likes);
};
