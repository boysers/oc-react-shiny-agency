import { Navigate, RouteObject } from 'react-router-dom'
import { App } from './App'
import { Error } from './components'
import { Home, Results, Survey, Freelances } from './pages'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'survey',
        element: <Navigate to="/survey/1" replace />
      },
      {
        path: 'survey/:questionNumber',
        element: <Survey />
      },
      {
        path: 'results',
        element: <Results />
      },
      {
        path: 'freelances',
        element: <Freelances />
      },
      {
        path: '404',
        element: <Error />
      },
      {
        path: '*',
        element: <Navigate to="404" replace />
      }
    ]
  }
]
