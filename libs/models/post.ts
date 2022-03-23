import {
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk
} from 'objection'
import { CommentModel } from './comment'
import { PostLikesModel } from './postLikes'

export class PostModel extends Model {
  id!: number
  title!: string
  date!: Date
  imageUrl!: string
  imagePlaceholder!: string
  commentCount?: number
  comments?: CommentModel[]
  likes?: PostLikesModel[] | number

  static get tableName() {
    return 'post'
  }
  static modifiers: Modifiers = {
    getLikesCount(query) {
      query.select(
        'Post.*',
        PostModel.relatedQuery('likes').count().as('likes')
      )
    },
    getCommentsCount(query) {
      query.select(
        'Post.*',
        PostModel.relatedQuery('comments').count().as('commentCount')
      )
    }
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: 'post.id',
          to: 'comment.post_id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: 'post.id',
          to: 'post_likes.post_id'
        }
      }
    }
  }
}
