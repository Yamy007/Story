import { User } from '../api/user'
export const Logout = () => {
	return User().logout()
}
