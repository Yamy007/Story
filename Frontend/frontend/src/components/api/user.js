import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const HostUrl = 'http://localhost:8000/'
export const User = () => {
	const UserAuth = {
		getCookie: async () => {
			const response = await axios.get(`${HostUrl}/auth/csrf_cookie`, {
				withCredentials: true,
			})
			return response
		},

		login: async (data = { username: 'tester1', password: 'pogkopi2004' }) => {
			if (!Cookies.get('csrftoken')) {
				await User().getCookie()
			} else {
				console.log('Cookie already exist')
			}
			const response = await axios
				.post(`${HostUrl}/auth/login`, data, {
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				})
				.catch(err => console.log(err))
			return response
		},

		checkIsAuthentication: async token => {
			const response = await axios
				.post(`${HostUrl}/auth/auth_check`, {
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
						Authorization: `Token ${token}`,
					},
					withCredentials: true,
				})
				.catch(err => console.log(err))
			return response
		},

		logout: async () => {
			const response = await axios
				.post(
					`${HostUrl}/auth/logout`,
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
				.post(`${HostUrl}/auth/register`, data, {
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
					},
					withCredentials: true,
				})
				.catch(err => console.log(err))
			return response
		},
		getProfile: async token => {
			try {
				const response = await axios.post(
					`${HostUrl}/users/profile`,
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': Cookies.get('csrftoken'),
							// Authorization: `Token ${token}`,
						},
						withCredentials: true,
					}
				)

				return response
			} catch (err) {
				return err
			}
		},
		profileUpdate: async (token, data) => {
			const response = await axios.post(
				'http://127.0.0.1:8000/users/update_user_profile',
				data,
				{
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken'),
						Authorization: `Token ${token}`,
					},
					withCredentials: true,
				}
			)
			return response
		},
		getAllUsers: async () => {
			const response = await axios.get(
				`${HostUrl}/auth/get_all_users`,
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
		},
	}
	return UserAuth
}
