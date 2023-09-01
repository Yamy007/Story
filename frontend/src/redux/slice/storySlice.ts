import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'
import { AxiosError } from 'axios'
import { IResponseStory } from '../../interface'

const initialState: IResponseStory = {
	response: null,
	message: '',
	page: null,
	data: null,
}

const getAll = createAsyncThunk<IResponseStory, void>(
	'storySlice/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await storyService.allStory()
			return data
		} catch (err) {
			const e = err as AxiosError
			return rejectWithValue(e.response.data)
		}
	}
)

const storySlice = createSlice({
	name: 'storySlice',
	initialState,
	reducers: {},
	extraReducers: build =>
		build.addCase(getAll.fulfilled, (state, actions) => {
			state.message = actions.payload.message
			state.response = actions.payload.response
			state.data = actions.payload.data
			state.page = actions.payload.page
		}),
})

const { reducer: storyReducer, actions } = storySlice

const storyActions = {
	...actions,
	getAll,
}
export { storyActions, storyReducer }
