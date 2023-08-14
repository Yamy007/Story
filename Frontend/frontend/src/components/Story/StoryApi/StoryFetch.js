import { api } from '../../api/api'
export const StoryFetch = {
	getStory: async (page, genre) => {
		try {
			const response = await api(`get_all_posts?page=${page}`)
			return response.data
		} catch (err) {
			console.log(err)
		}
	},
	getStoryInfo: async (id, page) => {
		try {
			const response = await api.get(`get_story?story=${id}&page=${page}`)
			console.log(response.data)
			return response.data
		} catch (err) {
			console.log(err)
		}
	},
}
