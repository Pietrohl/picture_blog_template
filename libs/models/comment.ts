import {
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk
} from 'objection'
import { CommentLikesModel } from './commentLikes'
import { UserModel } from './user'

export class CommentModel extends Model {
  id!: number
  authorId!: number
  postId!: number
  parentCommentId!: number
  content!: string
  date!: Date
  replies!: CommentModel[]
  author?: Pick<UserModel, 'email' | 'id' | 'avatarUrl'>
  likes?: CommentLikesModel[] | number

  static get tableName() {
    return 'comment'
  }

  static modifiers: Modifiers = {
    getLikesCount(query) {
      query.select(
        'Comment.*',
        CommentModel.relatedQuery('likes').count().as('likes')
      )
    },
    filterReplies(query) {
      const { ref } = CommentModel
      query.select(
        ref('id'),
        ref('authorId'),
        ref('parentCommentId'),
        ref('content'),
        ref('date'),
        CommentModel.relatedQuery('likes').count().as('likes')
      )
    }
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    const PostModel = require('./')

    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: 'comment.post_id',
          to: 'post.id'
        }
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'comment.author_id',
          to: 'user.id'
        }
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: 'comment.id',
          to: 'comment.parent_comment_id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: CommentLikesModel,
        join: {
          from: 'comment.id',
          to: 'comment_likes.comment_id'
        }
      }
    }
  }
}
