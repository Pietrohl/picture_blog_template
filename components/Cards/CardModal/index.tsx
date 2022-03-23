import { PostModel } from '@/libs/models'
import { useContextualRouting } from 'next-use-contextual-routing'
import router from 'next/router'
import React, { useEffect } from 'react'
import ExpandedCard, { ExpandedCardContentLoader } from '../Expanded'
import Modal from 'react-modal'

import styles from './styles.module.scss'
import { useTheme } from 'hooks/theme'

type CardProps = {
  postData?: PostModel
  isOpen: boolean
}

const CardModal: React.FC<CardProps> = ({ postData, isOpen }: CardProps) => {
  const { returnHref } = useContextualRouting()
  const { theme } = useTheme()

  useEffect(() => {
    const overlay = document.getElementsByClassName('')
    Modal.setAppElement('body')
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => router.push(returnHref)}
      contentLabel="Card Modal"
      preventScroll={true}
      shouldReturnFocusAfterClose
      className="modal-card animate__animated animate__flipInY"
      portalClassName={theme}
    >
      <header className="modal-card-head">
        <p className="modal-card-title">{postData?.title}</p>
        <button
          className="delete"
          onClick={() => router.push(returnHref)}
          aria-label="close"
        ></button>
      </header>
      <section className="modal-card-body">
        {postData ? (
          <ExpandedCard postData={postData} />
        ) : (
          <ExpandedCardContentLoader />
        )}
      </section>
    </Modal>
  )
}

export default CardModal
