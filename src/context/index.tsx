import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import LayoutContextProvider from 'context/layout.context'
import AuthContextProvider from 'context/auth.context'
import DialogContextProvider from 'context/dialog.context'
import { ToastContainer } from 'react-toastify'

const ContextsProvider: Component<ContextsProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
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
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default ContextsProvider
