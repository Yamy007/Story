import { UserActionTypes } from '../reducers/userReducer'

export const UserAction = {
	setUsers: data => ({ type: UserActionTypes.GET_USERS, payload: data }),
}
