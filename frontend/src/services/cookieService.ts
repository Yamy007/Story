import { AxiosResponse } from 'axios'
import { urls } from '../constant'
import { apiService } from './apiService'

export const csrfToken: string | undefined = document.cookie
	.split(';')
	?.filter(elem => elem.includes('csrftoken='))[0]
	?.split('csrftoken=')[1]

export const cookieService = {
	cookie: () =>
		csrfToken ? null : apiService.get<void>(urls.auth.csrf_cookie()),
}
