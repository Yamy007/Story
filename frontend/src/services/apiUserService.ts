import axios from 'axios'
import { baseURL } from '../constant/urls'
import { Cookies } from 'react-cookie'

export const apiService = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',

		// Authorization: 'Token ' + Cookies.get('token'),
	},
	withCredentials: true,
})
