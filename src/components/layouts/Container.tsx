import React from 'react'

interface Props {
  children: ReactNode
}

const Container: Component<Props> = ({ children }) => {
  return <div className="px-2 py-4">{children}</div>
}

export default Container
