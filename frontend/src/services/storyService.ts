import { urls } from '../constant'
import { apiService } from './apiService'
import { IResponse } from '../interface/InterfaceStory'
import { IGenre } from '../interface'

export const storyService = {
	allStory: () => apiService.get<IResponse>(urls.story.getAllPost()),
	allGenre: () => apiService.get<IGenre[]>(urls.story.getAllGenres()),
	story: (id: number, page?: number) =>
		apiService.get<IResponse>(urls.story.getStory(id, page)),
	related: (id: number, page: number) =>
		apiService.get<IResponse>(urls.story.getRelated(id, page)),
	comments: (id: number, page: number) =>
		apiService.get(urls.story.getStoryComments(id, page)), //TODO!!! interface
	storyReplies: (id: number, page: number) =>
		apiService.get(urls.story.getStoryReplies(id, page)), //TODO!!! interface
	view: (id: number) => apiService.post<IResponse>(urls.story.postSetView(id)),
}
