import axios from 'axios'
import Cookies from 'js-cookie'
export const UserAuth = () => {
	return {
		checkCookie: async () => {
			const response = await axios.get(
				'http://localhost:8000/auth/csrf_cookie',
				{
					withCredentials: true,
				}
			)
			return response
		},

		login: async (data = { username: 'tester1', password: 'pogkopi2004' }) => {
			const response = await axios
				.post('http://localhost:8000/auth/login', data, {
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
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
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': Cookies.get('csrftoken'),
						},
						withCredentials: true,
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
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				})
				.catch(err => console.log(err))
			return response
		},
		Profile: async () => {
			try {
				const response = await axios.post(
					'http://localhost:8000/users/profile',
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': Cookies.get('csrftoken'),
						},
						withCredentials: true,
					}
				)

				return response
			} catch (err) {
				return err
			}
		},
		profileUpdate: async () => {
			const response = await axios.post(
				'http://127.0.0.1:8000/users/update_user_profile',
				{},
				{
					headers: {
						'Content-Type': 'text/plain',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				}
			)
			return response
		},
	}
}
