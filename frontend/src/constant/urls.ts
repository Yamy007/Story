export const baseURL = 'http://localhost:8000'

const idAndPage = (id: number, page: number = 1): string => {
	return `?story=${id}&page=${page}`
}

export const urls = {
	story: {
		getAllPost: (
			views?: boolean,
			comments?: boolean,
			likes?: boolean,
			date?: boolean,
			genre?: number,
			search_request?: string
		): string => `get_all_posts`,
		getAllGenres: (): string => `get_all_genres`,
		getStory: (id: number, page: number): string =>
			`get_story` + idAndPage(id, page),
		getRelated: (id: number, page: number): string =>
			`get_related` + idAndPage(id, page),
		getStoryComments: (id: number, page: number): string =>
			`get_story_comments` + idAndPage(id, page),
		getStoryReplies: (id: number, page: number): string =>
			`get_story_comments_replies?reply_id=${id}&page=${page}`,
		postSetView: (id: number): string => `set_view?story=${id}`,
	},
	auth: {
		register: (): string => `auth/register`,
		csrf_cookie: (): string => `auth/csrf_cookie`,
		auth_check: (): string => `auth/auth_check`,
		login: (): string => `auth/login`,
		logout: (): string => `auth/logout`,
		getAllUsers: (): string => `auth/get_all_users`,
		changePassword: (): string => `auth/change_password`,
		resetPassword: (): string => `auth/reset_password`,
	},
	users: {
		getAllUserProfiles: (): string => `users/get_all_user_profiles`,
		updateUserProfile: (): string => `users/update_user_profile`,
		profile: (): string => `users/profile`,
		getUserLikedPosts: (): string => `users/get_user_liked_posts`,
		commentsMadeByUser: (): string => `users/comments_made_by_user`,
		storiesMadeByUser: (): string => `users/stories_made_by_user`,
		getUserNotificationsInfo: (): string => `users/get_user_notifications_info`,
		createOrUpdateStory: (): string => `users/create_or_update_story`,
		createUpdateReplyComment: (): string => `users/create_update_reply_comment`,
		likeStory: (): string => `users/like_story`,
		likeComment: (): string => `users/like_comment`,
	},
}
