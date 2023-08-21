import {
	createAsyncThunk,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'

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
	likes: [],
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

const addLike = createAsyncThunk(
	'storySlice/addLike',
	async ({ id, page }, thunkAPI) => {
		try {
			await storyService.addLike(id)
			thunkAPI.dispatch(allStory(page))
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

const getUserLike = createAsyncThunk(
	'storySlice/getUser/like',
	async (_, thunkAPI) => {
		try {
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
				return {
					...state,
					data: actions.payload.data,
					page: actions.payload.page,
					message: actions.payload.message,
				}
			})
			.addCase(getStory.fulfilled, (state, actions) => {
				state.data = actions.payload
			})
			.addCase(addLike.fulfilled, (state, actions) => {
				return {
					...state,
				}
			}),
})

const { reducer: storyReducer, actions } = StorySlice

const storyActions = {
	allStory,
	getStory,
	addLike,
}

export { storyReducer, storyActions }
