import React from 'react'
import random from 'utils/random'
import domUuid from 'utils/domUuid'

interface Props {
  children: JSX.Element | ReactNode
  n: number
  tags: React.ElementType[]
}

const RecursiveTag: Component<Props> = ({ children, n, tags }) => {
  const Tag = tags[random(0, tags.length - 1)] as React.ElementType

  if (n === 0) return <Tag id={domUuid()}>{children}</Tag>
  return (
    <Tag id={domUuid()}>
      <RecursiveTag n={n - 1} tags={tags}>
        {children}
      </RecursiveTag>
    </Tag>
  )
}

export default RecursiveTag
