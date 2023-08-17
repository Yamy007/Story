import { StoryActionTypes } from '../reducers/storyReducer'

export const StoryActions = {
	setStory: data => {
		return {
			type: StoryActionTypes.GET_STORY,
			payload: {
				data: data.story_data,
				page: data.story_page,
			},
		}
	},
}
