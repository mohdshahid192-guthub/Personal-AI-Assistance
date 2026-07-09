import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './Store/Store.ts'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevents TanStack from refetching data every time you click back into the browser window
      refetchOnWindowFocus: false, 
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
   < BrowserRouter>
    <App />
    </BrowserRouter>
    </QueryClientProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
