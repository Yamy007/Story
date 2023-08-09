import { UserAuth } from '../api/user'
export const Logout = () => {
	return UserAuth().logout()
}
