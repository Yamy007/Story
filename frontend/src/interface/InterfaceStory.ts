export interface IPages {
	current: number
	has_next: boolean
	has_previous: boolean
	number_of_pages: number
	number_of_items: number
}

export interface IStory extends IPages {
	story_id: number
	creator_user_id: number
	title: string
	story_body: string
	date: string
	likes: number
	comments: number
	genres: number[]
	views: number
	archivation_state: boolean
}

export interface IResponse extends IStory {
	response: boolean
	message: string
}
