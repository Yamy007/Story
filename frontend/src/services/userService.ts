import { url } from 'inspector'
import { apiService } from './apiService'
import { urls } from '../constant'
import { IResponse, IStory, IUser } from '../interface'
import { apiUserService } from './apiUserService'

export const userService = {
	register: (data: IUser) =>
		apiUserService.post<IResponse>(urls.auth.register(), data),
}
