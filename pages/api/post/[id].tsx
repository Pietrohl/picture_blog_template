import { CommentModel, PostModel } from 'libs/models'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  console.log('serving', id)

  const comments = (
    await CommentModel.query()
      .where({
        postId: id
      })
      .modify(['getLikesCount', 'filterReplies'])
      .withGraphJoined(
        `[
        replies(filterReplies).[
          likes,
          author
        ], 
        author
      ]`
      )
  ).filter(comment => comment.parentCommentId === 0)

  const post = await PostModel.query()
    .findById(id)
    .modify(['getLikesCount', 'getCommentsCount'])

  // .withGraphFetched('[comments.[likes]]')
  // .withGraphJoined('comments')

  post?.$appendRelated('comments', comments)
  res.send(!!post?.toJSON() && JSON.stringify(post, null, 2))
}

export default handler
