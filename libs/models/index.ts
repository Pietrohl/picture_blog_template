import { Model } from 'objection'
import Container from 'typedi'
import { DbClient } from '../utils/dbClient'

const dbClient = Container.get(DbClient)
Model.knex(dbClient.dbClient)

export { CommentModel } from './comment'
export { PostModel } from './post'
export { UserModel } from './user'
export { CommentLikesModel } from './commentLikes'
export { PostLikesModel } from './postLikes'
