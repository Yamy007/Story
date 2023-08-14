const initialState = {
	usersArray: [],
	count: 0,
	error: '',
}

export const UserActionTypes = {
	GET_USERS: 'GET_USERS',
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UserActionTypes.GET_USERS:
			return {
				...state,
				usersArray: action.payload,
				count: state.count + 1,
			}
		default:
			return state
	}
}
