const initialState = {
	data: [],
	page: {
		current: 1,
		number_of_pages: 1,
		number_of_stories: 1,
	},
	error: '',
}

export const PostActionTypes = {
	GET_POSTS: 'GET_POSTS',
}

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case PostActionTypes.GET_POSTS:
			return {
				...state,
				data: action.payload.data,
				page: action.payload.page,
			}

		default:
			return state
	}
}
