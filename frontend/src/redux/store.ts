import { configureStore } from '@reduxjs/toolkit'
import { storyReducer } from './slice/storySlice'
import { userReducer } from './slice/userSlice'

export const store = configureStore({
	reducer: {
		story: storyReducer,
		user: userReducer,
	},
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
