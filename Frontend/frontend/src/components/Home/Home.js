import React, { useEffect } from 'react'
import { Register } from '../Users/Register'
import { Box, Button } from '@mui/material'
import { Login } from '../Users/Login'
import { Logout } from '../Users/Logout'
export const Home = ({ isDark, setIsDark }) => {
	const checklogin = () => {
		fetch('http://127.0.0.1:8000/auth/auth_check')
			.then(value => value.json())
			.then(value => console.log(value))
	}
	return (
		<Box
			sx={{ padding: '10vh', minHeight: '80vh' }}
			bgcolor={isDark ? '#838181' : '#EBEBEB'}
		>
			<Register />
			<Login />
			<Logout />
			<Button onClick={checklogin}>Check Login</Button>
		</Box>
	)
}
