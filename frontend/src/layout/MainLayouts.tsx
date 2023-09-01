import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import { cookieService, userService } from '../services'

export const MainLayouts = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
