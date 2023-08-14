const innitState = {
	isAuthenticated: false,
	user: {
		id: null,
		username: null,
		email: null,
		is_premium: false,
		firstName: null,
		lastName: null,
		phone: null,
		address: null,
		avatar: null,
		bio: null,
	},
	error: {
		message: null,
		status: null,
	},
}

export const UserActionTypes = {
	GET_USER: 'GET_USER',
	SET_ERROR: 'SET_ERROR',
}

export const userReducer = (state = innitState, action) => {
	switch (action.type) {
		case UserActionTypes.GET_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			}
		case UserActionTypes.SET_ERROR:
			return {
				...state,
				error: {
					message: action.payload.message,
					status: action.payload.request.status,
				},
			}
		default:
			return state
	}
}
