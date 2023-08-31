import { urls } from '../constant'
import { apiService } from './apiService'
import { IResponse } from '../interface/InterfaceStory'

export const storyService = {
	allStory: () => apiService.get<IResponse>(urls.story.getAllPost()),
}
