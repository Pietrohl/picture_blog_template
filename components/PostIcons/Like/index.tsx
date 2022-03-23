import { mdiHeartOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

// import { Container } from './styles';

type LikeButtonProp = {
  likesCount?: number | any[]
}

const Like: React.FC<LikeButtonProp> = ({ likesCount }) => {
  return (
    <div
      className="is-flex is-justify-content-space-between"
      style={{ gap: '0.25em' }}
    >
      <span className="icon is-secondary">
        <Icon path={mdiHeartOutline}></Icon>
      </span>
      <span className="is-secondary">
        {typeof likesCount === 'number' ? likesCount : likesCount?.length} Likes
      </span>
    </div>
  )
}

export default Like
