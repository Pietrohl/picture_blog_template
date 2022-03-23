import {
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk
} from 'objection'

export class CommentLikesModel extends Model {
  id!: number
  authorId!: number
  commentId!: number

  static get tableName() {
    return 'comment_likes'
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    const CommentModel = require('./')
    const UserModel = require('./')

    return {
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: CommentModel,
        join: {
          from: 'comment_likes.comment_id',
          to: 'comment.id'
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
