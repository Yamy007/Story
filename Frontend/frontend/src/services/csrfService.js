import Cookies from 'js-cookie'
import { apiImageServices, apiServices } from './apiService'

export const UpdateCookie = () => {
	apiServices.defaults.headers['X-CSRFToken'] = Cookies.get('csrftoken')
	apiServices.defaults.headers['Authorization'] =
		'Token ' + Cookies.get('token')
}
