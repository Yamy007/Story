import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'
import { AxiosError } from 'axios'
import { IResponse, IStory } from '../../interface/InterfaceStory'

interface IState {
	data: IResponse
}

const initialState: IState = {
	data: null,
}

const getAll = createAsyncThunk<IResponse, void>(
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
			return {
				...state,
			}
		}),
})

const { reducer: storyReducer, actions } = storySlice

const storyActions = {
	...actions,
	getAll,
}
export { storyActions, storyReducer }
