import { CommentModel } from '@/libs/models'
import { dateFormatter } from '@/libs/utils/dateFormatter'
import Image from 'next/image'
import React, { ComponentProps, useState } from 'react'
import ProgressiveImage from '../ProgressiveImage'

enum ChildVisibility {
  yes,
  no = 0,
  one
}

type CommentThreeProps = {
  commentList: CommentModel[]
}
type CommentSectionProps = React.HTMLAttributes<HTMLDivElement> &
  Partial<CommentThreeProps>

type CommentProps = {
  commentData?: CommentModel
  childVisibility?: ChildVisibility
}

const CommentSection: React.FC<CommentSectionProps> = ({
  commentList,
  ...props
}) => {
  return (
    <div {...props}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <ProgressiveImage src="" layout="fill" />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-light">Post comment</button>
            </p>
          </div>
        </div>
      </article>
      {commentList && <CommentTree commentList={commentList} />}
    </div>
  )
}

const CommentTree: React.FC<CommentThreeProps> = ({ commentList }) => {
  return (
    <>
      {commentList?.map(comment => (
        <CommentNode key={comment.id} commentData={comment} />
      ))}
    </>
  )
}

const CommentNode: React.FC<CommentProps> = ({
  commentData,
  childVisibility = ChildVisibility.one
}) => {
  const [childVisible, setChildVisible] =
    useState<ChildVisibility>(childVisibility)
  const [hasChild] = useState(
    !!commentData?.replies && commentData?.replies?.length > 0
  )

  return (
    <article className="media" >
      <figure className="media-left">
        <p className="image is-48x48">
          <ProgressiveImage
            className="is-rounded"
            src={commentData?.author?.avatarUrl ?? ''}
            layout="fill"
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content" >
          <p className="is-size-7">
            <strong className="is-underlined has-text-weight-semibold">
              {commentData?.author?.email}
            </strong>
            <br />
            {commentData?.content}
            <br />
            <small>
              {typeof commentData?.likes === 'number'
                ? commentData?.likes
                : commentData?.likes?.length}{" "}
              <a>Like</a> · <a>Reply</a> · {dateFormatter(commentData?.date)}
            </small>
          </p>
        </div>
        {hasChild && !!childVisible && commentData?.replies && (
          <CommentTree commentList={commentData.replies} />
        )}
      </div>
    </article>
  )
}

export default CommentSection
