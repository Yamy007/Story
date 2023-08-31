import { url } from 'inspector'
import { apiService } from './apiService'
import { urls } from '../constant'

export const userService = {
	register: () => apiService.post(urls.auth.register()),
}
