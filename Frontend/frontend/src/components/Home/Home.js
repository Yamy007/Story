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
		</Box>
	)
}

export { Home }
