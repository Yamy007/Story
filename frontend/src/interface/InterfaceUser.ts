export interface IUser {
	id: number
	username: string
	first_name: string
	last_name: string
	email: string
	phone: string
	bio: string
	address: string
	is_premium: boolean
	image: string | null
	user: number
}

export interface IUserResponse {
	message: string
	response: boolean
	user?: IUser
	user_notifications?: number
}
