export const baseURL = 'http://localhost:8000'

const users = '/users'
const update = '/users/update_user_profile'

const login = '/auth/login'
const register = '/auth/register'
const logout = '/auth/logout'
const csrf_token = '/auth/csrf_cookie'
const genre = '/get_all_genres'
const story = '/get_all_posts'
const getStory = '/get_story'
const like = 'users/like_story'
const userLike = 'users/get_user_liked_posts'
export const urls = {
	users: {
		base: users,
		login,
		csrf_token,
		register,
		logout,
		update,
	},
	story: {
		base: story,
		info: getStory,
		like,
		userLike,
	},
	genre: {
		genre,
	},
}
