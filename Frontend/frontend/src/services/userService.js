import { apiImageServices, apiServices } from './apiService'
import { baseURL, urls } from '../constants/urls'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { UpdateCookie } from './csrfService'

export const userService = {
	getCsrfToken: async () =>
		await apiServices.get(urls.users.csrf_token).then(() => UpdateCookie()),

	login: async (login, password) =>
		await userService
			.getCsrfToken()
			.then(() => apiServices.post(urls.users.login, { login, password })),

	registration: async data =>
		await userService
			.getCsrfToken()
			.then(() => apiServices.post(urls.users.register, data)),

	logout: async () =>
		await userService
			.getCsrfToken()
			.then(() => apiServices.post(urls.users.logout)),
	updateImage: async image =>
		await userService
			.getCsrfToken()
			.then(() => apiImageServices.post(urls.users.update, image)),
	updateProfile: async data =>
		await userService
			.getCsrfToken()
			.then(() => apiServices.post(urls.users.update, data)),
}
