import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/auth.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from '@mantine/notifications'


const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Notifications position='bottom-left'/>
            <App />
            <ReactQueryDevtools/>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>

  </React.StrictMode>,
)
