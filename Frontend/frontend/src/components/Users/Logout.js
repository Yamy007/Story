import { UserActions } from '../../reduxCore/actions/UserAction'
import { User } from '../api/user'
export const Logout = dispatch => {
	localStorage.removeItem('User')
	dispatch(UserActions.logout())
	return User().logout()
}
