<<<<<<< HEAD
import React from 'react'
import axios from 'axios'
import { Box, Button } from '@mui/material'
import Cookies from 'js-cookie'
function Home() {
	const checkCookie = () => {
		axios
			.get('http://localhost:8000/auth/csrf_cookie', { withCredentials: true })
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	const login = () => {
		axios
			.post(
				'http://localhost:8000/auth/login',
				{ username: 'tester1', password: 'pogkopi2004' },
				{
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				}
			)
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	const check = () => {
		axios
			.get('http://localhost:8000/auth/auth_check', { withCredentials: true })
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	const logout = () => {
		axios
			.post(
				'http://localhost:8000/auth/logout',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				}
			)
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	return (
		<Box sx={{ paddingTop: '10vh' }}>
			<Button variant='outlined' onClick={checkCookie}>
				check Cookie
			</Button>
			<Button variant='contained' onClick={login}>
				login
			</Button>
			<Button variant='text' onClick={check}>
				Check
			</Button>
			<Button variant='outlined' onClick={logout}>
				Logout
			</Button>
=======
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
>>>>>>> main
		</Box>
	)
}

export { Home }
