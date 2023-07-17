import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DiaryHomePage from '../app/page'
import DiaryDetailPage from '../app/detail/[id]/page'
import DiaryEmotionLinkPage from '../app/emotions/page'
import DiaryEmotionPage from '../app/emotions/[emotion]/page'

export type DiaryRouterPath = '/' | `/detail/${string}` | '/emotions' | `/emotions/${string}`
const diaryRouter = createBrowserRouter([
    {
        path: '/',
        element: <DiaryHomePage />,
    },
    {
        path: '/detail/:id',
        element: <DiaryDetailPage />,
    },
    {
        path: '/emotions',
        element: <DiaryEmotionLinkPage />,
    },
    {
        path: '/emotions/:emotion',
        element: <DiaryEmotionPage />,
    },
])

export const DiaryRouter = () => <RouterProvider router={diaryRouter} />
