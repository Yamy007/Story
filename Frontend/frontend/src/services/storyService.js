import { apiServices } from './apiService'
import { urls } from '../constants/urls'

export const storyService = {
	getStory: page => apiServices.get(urls.story.base + `?page=${page}`),
	getStoryInfo: (id, page) =>
		apiServices.get(urls.story.info + `?page=${page}&story=${id}`),
	getAllGenres: () => apiServices.get(urls.genre.genre),
	addLike: id => apiServices.post(urls.story.like + `?story=${id}`),
}
