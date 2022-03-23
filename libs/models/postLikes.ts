import { Model, RelationMappings, RelationMappingsThunk } from 'objection'

export class PostLikesModel extends Model {
  id!: number
  authorId!: number
  postId!: number

  static get tableName() {
    return 'post_likes'
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    const PostModel = require('./')
    const UserModel = require('./')

    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: 'post_likes.post_id',
          to: 'post.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'comment_likes.author_id',
          to: 'user.id'
        }
      }
    }
  }
}
