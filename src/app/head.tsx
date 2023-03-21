import React from 'react'

export default function Head() {
  return (
    <>
      <meta name="robots" content="noindex" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <title>{'Accueil | ' + process.env.NEXT_PUBLIC_APP_NAME}</title>
    </>
  )
}
