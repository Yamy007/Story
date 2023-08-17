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
	setToken: token => {
		return {
			type: UserActionTypes.SET_TOKEN,
			payload: token,
		}
	},
	logout: () => {
		return {
			type: UserActionTypes.LOGOUT,
		}
	},
}
