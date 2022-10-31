import { useMemo } from 'react'
import { IconButton } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

import { useToggle } from 'hooks'

interface Props {
  src: string
  width: number
  height: number
  alt: string
  className?: string
  fullScreen?: boolean
}

const Img: Component<Props> = ({ src, width, height, alt, className, fullScreen }) => {
  const [isFullScreen, toggleFullScreen] = useToggle(false)

  const handleClick = useMemo(
    () => (fullScreen ? toggleFullScreen : undefined),
    [fullScreen, toggleFullScreen]
  )

  return (
    <>
      <img
        src={src}
        onClick={handleClick}
        width={width}
        height={height}
        alt={alt}
        className={className}
      />

      {isFullScreen && (
        <div className="fixed m-0 top-0 left-0 bg-black bg-opacity-40 w-screen h-screen z-90">
          <div className="absolute top-5 right-5">
            <IconButton
              aria-label="close"
              variant="outline"
              icon={<FaTimes />}
              onClick={toggleFullScreen}
            />
          </div>
          <div className="flex w-full h-full items-center justify-center">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  )
}

Img.defaultProps = {
  fullScreen: true
}

export default Img
