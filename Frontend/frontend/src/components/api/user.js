import axios from 'axios'
import Cookies from 'js-cookie'
import {Buffer} from 'buffer';
import myInitObject from './login_data';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const username = "testuser2"
const password = "pogkopi2004"

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

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
						"X-CSRFTOKEN": Cookies.get('csrftoken'),
					},
					withCredentials: true,

				})
				.catch(err => console.log(err))
			return response
		},

		check: async () => {
			const response = await axios
				.post('http://localhost:8000/auth/auth_check', {}, {
					withCredentials: true,
					credentials: true,
					headers: {
						// "X-CSRFTOKEN": Cookies.get('csrftoken'),
						'Authorization': `Basic ${token}`,
					},
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
							"X-CSRFTOKEN": Cookies.get('csrftoken'),
						},
						withCredentials: true,
						credentials: true,
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
						"X-CSRFTOKEN": Cookies.get('csrftoken'),
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
							"X-CSRFTOKEN": Cookies.get('csrftoken'),
						},
						withCredentials: true,
						credentials: true,
					}
				)

				return response
			} catch (err) {
				return err
			}
		},
		profileUpdate: async () => {
			console.log(myInitObject)
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/users/update_user_profile',
					{
						first_name: "tester1",
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFTOKEN': Cookies.get('csrftoken'),
							'Authorization': 'Token  9ebda190c6b00dc7a75672c389745d5003b9024e',
						},
						withCredentials: true,
						credentials: true,
						
					}
				)
				return response
			} catch (err) {
				return err
			}
		},
	}
}
