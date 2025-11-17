import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Feed from './components/Feed/Feed'
import ArtworkPage from './components/Artworks/ArtworkPage'
import ContextHelp from './components/Layout/ContextHelp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: 'artwork/:artworkId',
        element: <ArtworkPage />
      },
      {
        path: 'about',
        element: <ContextHelp />
      }
    ]
  }
])
