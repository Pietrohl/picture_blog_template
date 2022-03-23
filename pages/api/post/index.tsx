import { PostModel } from 'libs/models'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const posts = await PostModel.query().select(
        'Post.*',
        PostModel.relatedQuery('comments').count().as('commentCount'),
        PostModel.relatedQuery('likes').count().as('likes')
      )
      res.send(JSON.stringify(posts, null, 2))
      break
    default:
      res.redirect('/error')
  }
}

export default handler
