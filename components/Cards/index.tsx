import { PostModel } from 'libs/models'
import React, { useMemo } from 'react'
import CompactedCard, { CompactedCardContentLoader } from './Compacted'
import ExpandedCard, { ExpandedCardContentLoader } from './Expanded'
import styles from './styles.module.scss'

export enum ViewTypes {
  large = 'large',
  small = 'small'
}

type CardsListProps = {
  posts: PostModel[]
  viewType?: ViewTypes
}

const Cards: React.FC<CardsListProps> = ({
  posts,
  viewType = ViewTypes.large
}: CardsListProps) => {
  const Card = useMemo(() => {
    if (viewType === ViewTypes.large) {
      return ExpandedCard
    } else {
      return CompactedCard
    }
  }, [viewType])

  return (
    <section className={`${styles.cardContainer} ${styles[viewType]}`}>
      {posts.map(post => (
        <Card postData={post} key={post.id} />
      ))}
    </section>
  )
}

export default Cards
