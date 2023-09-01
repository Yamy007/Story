import { url } from 'inspector'
import { apiService } from './apiService'
import { urls } from '../constant'
import { ILogin, IRegister, IUserResponse } from '../interface'
import { apiUserService } from './apiUserService'

export const userService = {
	register: (data: IRegister) =>
		apiUserService.post<IUserResponse>(urls.auth.register(), data),
	login: (data: ILogin) =>
		apiUserService.post<IUserResponse>(urls.auth.login(), data),
}
