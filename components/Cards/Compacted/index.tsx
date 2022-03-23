import { PostModel } from 'libs/models'
import Image from 'next/image'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import ContentLoader from 'react-content-loader'
import { useContextualRouting } from 'next-use-contextual-routing'
import { useRouter } from 'next/router'

type CardProps = {
  postData: PostModel
}

const CompactedCard: React.FC<CardProps> = ({ postData }: CardProps) => {
  if (!postData) return <CompactedCardContentLoader />
  const router = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  return (
    <a
      onClick={() =>
        router.push(
          makeContextualHref({ postId: postData.id }),
          'post/' + postData.id,
          { shallow: true }
        )
      }
    >
      <div className="card" style={{ maxWidth: 340 }}>
        <div className="card-image">
          <figure className="image ">
            <Image
              src={postData?.imageUrl}
              alt={postData?.title}
              layout="intrinsic"
              width={340}
              height={340}
              placeholder="blur"
              blurDataURL={postData?.imagePlaceholder}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="subtitle is-5 has-text-weight-medium">
              {postData?.title}
            </p>
            <br />
            <p
              className="subtitle is-6"
              style={{
                position: 'absolute',
                bottom: '12px'
              }}
            >
              {formatDistanceToNow(postData?.date, {
                addSuffix: true,
                includeSeconds: true
              })}
            </p>
          </div>
        </div>
      </div>
    </a>
  )
}

export const CompactedCardContentLoader: React.FC<{
  size?: { width: number; height: number }
}> = ({ size = { width: 340, height: 340 }, ...props }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image ">
        <ContentLoader
          speed={2}
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: '100%' }}
          {...props}
        >
          <rect
            x="0"
            y="60"
            rx="2"
            ry="2"
            width={size.width}
            height={size.height}
          />
        </ContentLoader>
      </figure>
    </div>
    <div className="card-content">
      <ContentLoader
        speed={2}
        width={340}
        height={150}
        viewBox="0 0 340 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <rect x="0" y="120" rx="3" ry="3" width="178" height="6" />
      </ContentLoader>
    </div>
  </div>
)

export default CompactedCard
