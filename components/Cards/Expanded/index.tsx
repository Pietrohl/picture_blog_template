import PostIcons from '@/components/PostIcons'
import { dateFormatter } from '@/libs/utils/dateFormatter'
import { formatDistanceToNow } from 'date-fns'
import { PostModel } from 'libs/models'
import Image from 'next/image'
import React from 'react'
import ContentLoader from 'react-content-loader'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  postData: PostModel
}
const ExpandedCard: React.FC<CardProps> = ({
  postData,
  ...props
}: CardProps) => {
  if (!postData) return <ExpandedCardContentLoader />

  return (
    <section className="section" {...props}>
      <h3 className="subtitle is-5 has-text-weight-medium">
        {postData?.title}
      </h3>
      <br />
      <h2 className="subtitle is-6">{dateFormatter(postData?.date)}</h2>
      <div
        className="box"
        style={{
          margin: 'auto',
          width: 'fit-content',
          paddingRight: '8px',
          paddingTop: '8px',
          paddingLeft: '8px',
          paddingBottom: '0',
          boxShadow: '4px 8px 16px 0px rgba(54, 54, 54, 0.2)'
        }}
      >
        <Image
          src={postData.imageUrl}
          alt="picsum photo"
          width={800}
          height={800}
          layout="intrinsic"
          placeholder="blur"
          blurDataURL={postData?.imagePlaceholder}
        ></Image>
      </div>
      <div className="container" style={{ marginTop: '60px' }}>
        {<PostIcons post={postData} />}
      </div>
      <hr />
    </section>
  )
}

export const ExpandedCardContentLoader: React.FC<{
  size?: { width: number; height: number }
}> = ({ size = { width: 800, height: 800 }, ...props }) => (
  <ContentLoader
    speed={2}
    width={size.width}
    height={size.height}
    viewBox={`0 0 ${size.width} ${size.height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
    style={{ width: '100%' }}
  >
    <rect
      x="0"
      y="60"
      rx="2"
      ry="2"
      width={size.width}
      height={size.height}
      style={{ width: '100%' }}
    />
  </ContentLoader>
)

export default ExpandedCard
