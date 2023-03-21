'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import LayoutContextProvider from 'context/layout.context'
import AuthContextProvider from 'context/auth.context'
import DialogContextProvider from 'context/dialog.context'

const queryClient = new QueryClient()

const ContextsProvider: Component<ContextsProviderProps> = ({ children, initialState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutContextProvider>
        <AuthContextProvider initialUser={initialState.user}>
          <DialogContextProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              pauseOnHover
            />
          </DialogContextProvider>
        </AuthContextProvider>
      </LayoutContextProvider>
    </QueryClientProvider>
  )
}

export default ContextsProvider
