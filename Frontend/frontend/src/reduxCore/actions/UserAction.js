import { UserActionTypes } from '../reducers/userReducer'

export const UserActions = {
	setUser: data => {
		return {
			type: UserActionTypes.GET_USER,
			payload: data,
		}
	},
	setError: error => {
		return {
			type: UserActionTypes.SET_ERROR,
			payload: error,
		}
	},
}
