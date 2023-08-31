export interface IPages {
	current: number
	has_next: boolean
	has_previous: boolean
	number_of_pages: number
	number_of_items: number
}

export interface IStory {
	story_id: number
	creator_user_id: number
	title: string
	story_body: string
	date: string
	likes: number
	comments: number
	genres: number[] | string[]
	views: number
	body?: string[]
	archivation_state?: boolean
}

export interface IResponse {
	response: boolean
	message: string
	page?: IPages
	data?: IStory[] | IStory
}
