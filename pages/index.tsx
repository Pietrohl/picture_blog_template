import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.scss'
import Cards, { ViewTypes } from '@/components/Cards'
import { PostModel } from '@/libs/models'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import CardModal from '@/components/Cards/CardModal'
import qs from 'qs'

type HomeProps = {
  postList: PostModel[]
}

const Home = ({ postList = [] }: HomeProps) => {
  const router = useRouter()
  const { events } = router
  const [view, setView] = useState<ViewTypes>(ViewTypes.large)
  const [postId, setPostId] = useState<number | null>(
    Number(router.query.postId) || null
  )
  const [postData, setPostData] = useState<PostModel>()

  const handleQueryView = (url: any, { shallow }: any) => {
    const queryView = Object.entries(qs.parse(url)).find(([key, value]) =>
      key.includes('view')
    )?.[1]

    if (queryView)
      if (queryView === ViewTypes.small || queryView === ViewTypes.large) {
        if (queryView !== view) {
          console.log('changing view', view)
          console.log('queryView', queryView)
          setView(queryView)
          console.log('changing view', view)
        }
      } else {
        router.push('/', undefined, {
          shallow: true
        })
      }
  }

  useEffect(() => {
    if (!router.query.view)
      if (view !== ViewTypes.large) setView(ViewTypes.large)
  }, [router.query.view])

  useEffect(() => {
    events.on('routeChangeComplete', handleQueryView)

    return () => {
      events.off('routeChangeComplete', handleQueryView)
    }
  }, [])

  useEffect(() => {
    setPostId(Number(router.query.postId))
  }, [router.query.postId])

  useEffect(() => {
    if (postId)
      setPostData(
        postList.find(post => {
          return post.id === postId
        })
      )
  }, [postId])

  return (
    <div>
      <CardModal isOpen={!!postId} postData={postData} />
      <Cards posts={postList} viewType={view} />
    </div>
  )
}

export async function getStaticProps() {
  const posts = JSON.parse(JSON.stringify(await PostModel.query().modify(['getLikesCount', 'getCommentsCount'])))
  return {
    props: { postList: posts },
    revalidate: 80
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout styles={styles}>{page}</Layout>
}

export default Home
