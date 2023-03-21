import React from 'react'

import { Page } from 'app/next'
import EmptyLayout from 'components/layouts/pages/EmptyLayout'

const DevPage: Page = () => {
  return (
    <div className="p-10">
      <h1>Dev page</h1>
    </div>
  )
}

DevPage.layout = EmptyLayout

export default DevPage
