// import { UserActions } from '../../reduxCore/actions/UserAction'
import { UserActions } from '../../redux/slice/UserSlice'
export const Logout = dispatch => {
	// localStorage.removeItem('User')
	return dispatch(UserActions.logout())
}
