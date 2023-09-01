import axios from 'axios'
import { baseURL } from '../constant/urls'
import { csrfToken } from './cookieService'

export const apiUserService = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrfToken,
	},
	withCredentials: true,
})
