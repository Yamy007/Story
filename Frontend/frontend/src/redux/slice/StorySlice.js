import {
	createAsyncThunk,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'
import { useDispatch } from 'react-redux'

const initialState = {
	data: [],
	page: {
		current: 1,
		has_next: true,
		has_previous: false,
		number_of_pages: 1,
		number_of_stories: 0,
	},
	message: '',
}

const allStory = createAsyncThunk(
	'storySlice/allStory',
	async (page, thunkAPI) => {
		try {
			const { data } = await storyService.getStory(page)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

const getStory = createAsyncThunk(
	'storySlice/getStory',
	async ({ id, page }, thunkAPI) => {
		try {
			const { data } = await storyService.getStoryInfo(id, page)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

export const StorySlice = createSlice({
	name: 'storySlice',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(allStory.fulfilled, (state, actions) => {
				state.data = actions.payload.data
				state.page = actions.payload.page
				state.message = actions.payload.message
			})
			.addCase(getStory.fulfilled, (state, actions) => {
				state.data = actions.payload
			}),
})

const { reducer: storyReducer, actions } = StorySlice

const storyActions = {
	allStory,
	getStory,
}

export { storyReducer, storyActions }
