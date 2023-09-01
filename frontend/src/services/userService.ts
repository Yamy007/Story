import { url } from 'inspector'
import { apiService } from './apiService'
import { urls } from '../constant'

export const userService = {
	cookie: () => apiService.get(urls.auth.csrf_cookie()),
	register: () => apiService.post(urls.auth.register()),
}
