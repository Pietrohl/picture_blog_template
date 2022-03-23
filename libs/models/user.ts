import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { CommentModel } from './comment'
import { CommentLikesModel } from './commentLikes'
import { PostLikesModel } from './postLikes'

export class UserModel extends Model {
  id!: number
  email!: string
  avatarUrl?: string
  comments?: CommentModel[]
  postLikes?: PostLikesModel[]
  commentLikes?: CommentLikesModel[]

  static get tableName() {
    return 'user'
  }
  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: 'user.id',
          to: 'author.user_id'
        }
      },
      postLikes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: 'user.id',
          to: 'post_likes.author_id'
        }
      },
      commentLikes: {
        relation: Model.HasManyRelation,
        modelClass: CommentLikesModel,
        join: {
          from: 'user.id',
          to: 'comment_likes.author_id'
        }
      }
    }
  }
}
