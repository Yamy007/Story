import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Logout } from '../Users/Logout'
import { Login } from '../Users/Login'
import { Register } from '../Users/Register'
import { UserAuth } from '../api/user'

export const Home = () => {
	const [isAuth, setIsAuth] = useState(false)
	const [save, onSave] = useState(false)
	useEffect(() => {
		const check = async () => {
			const response = await UserAuth().check()
			console.log(response)
			setIsAuth(response.data ? Object.keys(response.data)[0] : null)
		}
		check()
	}, [isAuth, save])

	return (
		<Box sx={{ paddingTop: '10vh' }}>
			{isAuth !== 'false' ? (
				<Logout onSave={onSave} />
			) : (
				<>
					<Login onSave={onSave} />
					<Register onSave={onSave} />
				</>
			)}
		</Box>
	)
}
