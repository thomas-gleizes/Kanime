'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import ContextsProvider from 'context'
import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'

import 'styles/globals.css'
import 'styles/fonts.css'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head />
      <body>
        <CacheProvider>
          <ChakraProvider>
            <ContextsProvider initialState={{}}>
              <Header />
              <main>{children}</main>
              <Footer />
            </ContextsProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
