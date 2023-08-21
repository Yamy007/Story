import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slice/UserSlice'
import { storyReducer } from './slice/StorySlice'
import { themeReduce } from './slice/ThemeSlice'

export const store = configureStore({
	reducer: {
		story: storyReducer,
		user: userReducer,
		theme: themeReduce,
	},
})
