import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

// import { Container } from './styles';

type ProgressiveImageProps = Exclude<ImageProps, 'src'> & {
  onErrorSrc?: string
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src: imagesrc,
  onErrorSrc = 'https://bulma.io/images/placeholders/64x64.png',
  ...props
}) => {
  const [error, setError] = useState<boolean>(false)

  return (
    <Image
      {...props}
      src={error || !imagesrc ? onErrorSrc : imagesrc}
      onError={() => setError(true)}
    />
  )
}

export default ProgressiveImage
