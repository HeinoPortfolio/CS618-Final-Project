import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Blog } from './Blog.jsx'
import { Blog } from './pages/Blog.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup.jsx'

const queryClient = new QueryClient()

// Create a router variable ====================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
