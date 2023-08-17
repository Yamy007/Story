import { PostActionTypes } from '../reducers/postReducer'
export const PostActions = {
	setPost: data => {
		return {
			type: PostActionTypes.GET_POSTS,
			payload: {
				data: data.data,
				page: data.page,
			},
		}
	},
}
