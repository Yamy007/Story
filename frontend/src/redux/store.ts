import { configureStore } from '@reduxjs/toolkit'
import { storyReducer } from './slice/storySlice'

export const store = configureStore({
	reducer: {
		story: storyReducer,
	},
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
