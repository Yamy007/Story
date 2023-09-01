import { url } from 'inspector'
import { apiService } from './apiService'
import { urls } from '../constant'
import {
	ILogin,
	IResponse,
	IStory,
	IRegister,
	IUserResponse,
} from '../interface'
import { apiUserService } from './apiUserService'

export const userService = {
	register: (data: IRegister) =>
		apiUserService.post<IResponse>(urls.auth.register(), data),
	login: (data: ILogin) =>
		apiUserService.post<IUserResponse>(urls.auth.login(), data),
}
