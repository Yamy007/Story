import axios from 'axios'
import Cookies from 'js-cookie'

export const UserAuth = () => {
	return {
		checkCookie: async () => {
			const response = await axios.get(
				'http://localhost:8000/auth/csrf_cookie',
				{
					credentials: true,
				}
			)
			return response
		},

		login: async (data = { username: 'tester235', password: 'pogkopi2004' }) => {
			const response = await axios
				.post('http://localhost:8000/auth/login', data, {
					withCredentials: true,
					credentials: true,
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					
				})
				.catch(err => console.log(err))
			return response
		},

		check: async () => {
			const response = await axios
				.get('http://localhost:8000/auth/auth_check', {
					withCredentials: true,
				})
				.catch(err => console.log(err))
			return response
		},

		logout: async () => {
			const response = await axios
				.post(
					'http://localhost:8000/auth/logout',
					{},
					{
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': Cookies.get('csrftoken'),
						},
						
					}
				)
				.catch(err => console.log(err))
			return response
		},

		Registration: async (
			data = {
				username: 'name1',
				email: 'email@test.com',
				password: 'pogkopi2004',
				re_password: 'pogkopi2004',
			}
		) => {
			const response = await axios
				.post('http://localhost:8000/auth/register', data, {
					withCredentials: true,
					credentials: true,
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					
				})
				.catch(err => console.log(err))
			return response
		},
	}
}
