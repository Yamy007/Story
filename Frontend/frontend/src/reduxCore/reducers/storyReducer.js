const initialState = {
	data: [],
	page: {
		story_page_count: 1,
		story_current: 1,
	},
	error: '',
}

export const StoryActionTypes = {
	GET_STORY: 'GET_STORY',
}

export const storyReducer = (state = initialState, action) => {
	switch (action.type) {
		case StoryActionTypes.GET_STORY:
			return {
				...state,
				data: action.payload.data,
				page: action.payload.page,
			}
		default:
			return state
	}
}
