import {
	createAsyncThunk,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'
import { apiServices } from '../../services/apiService'

const initialState = {
	genre: [],
}

const allGenre = createAsyncThunk(
	'genreSlice/allGenre',
	async (_, thunkAPI) => {
		try {
			const { data } = await storyService.getAllGenres()
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

const GenreSlice = createSlice({
	name: 'genreSlice',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder.addCase(allGenre.fulfilled, (state, actions) => {
			return {
				...state,
				genre: actions.payload,
			}
		}),
})
const { reducer: genreReducer, actions } = GenreSlice

const genreActions = {
	allGenre,
}

export { genreReducer, genreActions }
