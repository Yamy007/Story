import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storyService } from '../../services/storyService'
import { AxiosError } from 'axios'
import { IResponse, IStory } from '../../interface/InterfaceStory'
import { IUser } from '../../interface/InterfaceUser'
import { userService } from '../../services'

interface IUserState {
	response: boolean
	message: string
}

const initialState: IUserState = {
	response: null,
	message: '',
}

const register = createAsyncThunk(
	'register/userSlice',
	async (user: IUser, { rejectWithValue }) => {
		try {
			const { data } = await userService.register(user)
			return data
		} catch (err) {
			const e = err as AxiosError
			return rejectWithValue(e.response.data)
		}
	}
)

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {},
	extraReducers: build =>
		build.addCase(register.fulfilled, (state, actions) => {
			state.response = actions.payload.response
			state.message = actions.payload.message
		}),
})

const { reducer: userReducer, actions } = userSlice

const userActions = {
	...actions,
	register,
}
export { userActions, userReducer }
