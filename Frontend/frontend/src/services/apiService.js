import axios from 'axios'
import { baseURL } from '../constants/urls'
import Cookies from 'js-cookie'

export const apiServices = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': Cookies.get('csrftoken'),
		Authorization: 'Token ' + Cookies.get('token'),
	},
	withCredentials: true,
})

export const apiImageServices = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'multipart/form-data',
		'X-CSRFToken': Cookies.get('csrftoken'),
		Authorization: 'Token ' + Cookies.get('token'),
	},
	withCredentials: true,
})
