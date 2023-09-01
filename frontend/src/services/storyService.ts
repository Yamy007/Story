import { urls } from '../constant'
import { apiService } from './apiService'
import { IGenre, IResponseStory } from '../interface'

export const storyService = {
	allStory: () => apiService.get<IResponseStory>(urls.story.getAllPost()),
	allGenre: () => apiService.get<IGenre[]>(urls.story.getAllGenres()),
	story: (id: number, page?: number) =>
		apiService.get<IResponseStory>(urls.story.getStory(id, page)),
	related: (id: number, page: number) =>
		apiService.get<IResponseStory>(urls.story.getRelated(id, page)),
	comments: (id: number, page: number) =>
		apiService.get(urls.story.getStoryComments(id, page)), //TODO!!! interface
	storyReplies: (id: number, page: number) =>
		apiService.get(urls.story.getStoryReplies(id, page)), //TODO!!! interface
	view: (id: number) =>
		apiService.post<IResponseStory>(urls.story.postSetView(id)),
}
