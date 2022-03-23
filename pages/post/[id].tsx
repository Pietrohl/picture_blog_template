import ExpandedCard, {
  ExpandedCardContentLoader
} from '@/components/Cards/Expanded'
import CommentSection from '@/components/Comment'
import Layout from '@/components/Layout'
import { PostModel } from 'libs/models'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../../styles/Post.module.scss'

type PostPageProps = {
  postData: PostModel
}

const Post = ({ postData }: PostPageProps) => {
  const [post, setPost] = useState<PostModel>(postData)
  const { isFallback } = useRouter()
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    async function fetchData() {
      try {
        if (query.id && typeof query.id === 'string') {
          const updatedPost = await fetch(
            ('http://localhost:3000/api/post/' + query.id) as string
          ).then(response => response.json() as unknown as PostModel)

          setPost(updatedPost)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [query, isFallback])

  if (isFallback) return <ExpandedCardContentLoader />

  return (
    <div className={styles.container}>
      <ExpandedCard className={styles.section + ' section'} postData={post} />

      <CommentSection className="container m-5" commentList={post?.comments} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await PostModel.query().select('id')).map(post => ({
    params: Object.fromEntries(
      Object.entries(post.toJSON()).map(([key, value]) => [key, String(value)])
    )
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context
  const id = params?.id as string

  const post = await PostModel.query().findById(id)
  const postData = post?.toJSON()
  if (!postData || !post) {
    return { notFound: true }
  }

  return {
    props: { postData },
    revalidate: 600
  }
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout styles={styles}>{page}</Layout>
}

export default Post
