/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {

  const comments = await knex('comment').select('id', 'author_id').from('comment')
  const naturalLikes = comments.map(comment => {
    return {
      comment_id: comment.id,
      author_id: comment.author_id
    }
  })

  for (let i = 0; i < 100; i++) {
    const like = {
      comment_id: Math.ceil(100 * Math.random()),
      author_id: Math.ceil(10 * Math.random()),
    }
    if (!naturalLikes.some(e => (e.comment_id === like.comment_id) && (e.author_id === like.author_id)))
      naturalLikes.push(like)
  }


  // Deletes ALL existing entries
  await knex('comment_likes').del()
  await knex('comment_likes').insert(naturalLikes);
};
