import React from 'react'
import {
  mdiHeartOutline,
  mdiHeartHalfFull,
  mdiHeartMultiple,
  mdiChatProcessingOutline,
  mdiShareAll
} from '@mdi/js'
import Icon from '@mdi/react'
import Like from './Like'
import { PostModel } from '@/libs/models'

const IconComponent = ({ icon, name }: any) => {
  return (
    <div
      className="is-flex is-justify-content-space-between"
      style={{ gap: '0.25em' }}
    >
      <span className="icon is-secondary">
        <Icon path={icon}></Icon>
      </span>
      {!!name && <span className="is-secondary">{name}</span>}
    </div>
  )
}

type PostIconsProps = {
  post: PostModel
}

const PostIcons: React.FC<PostIconsProps> = ({
  post: { likes, commentCount, id }
}) => {
  return (
    <div
      className=" is-flex is-flex-direction-row is-justify-content-flex-end"
      style={{ gap: '1.25em' }}
    >
      <a>
        <Like likesCount={likes}/>
      </a>
      <a>
        <IconComponent
          icon={mdiChatProcessingOutline}
          name={`${commentCount} Comment`}
        />
      </a>
      <a>
        <IconComponent icon={mdiShareAll} name="Share" />
      </a>
    </div>
  )
}

export default PostIcons
