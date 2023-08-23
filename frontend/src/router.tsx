import { Navigate, createBrowserRouter } from 'react-router-dom'
import { MainLayouts } from './layout'
import { HomePage } from './pages'

export const router = createBrowserRouter([
	{
		path: '',
		element: <MainLayouts />,
		children: [
			{
				index: true,
				element: <Navigate to={'home'} />,
			},
			{
				path: 'home',
				element: <HomePage />,
			},
		],
	},
])
