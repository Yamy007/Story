import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { userService } from '../../services'
import { ILogin, IRegister, IUserResponse } from '../../interface'
import { TypeResponse } from '../../type/TypeResponse'

const initialState: IUserResponse = {
	response: null,
	message: '',
	user: null,
	user_notifications: 0,
}

const register = createAsyncThunk(
	'register/userSlice',
	async (user: IRegister, { rejectWithValue }) => {
		try {
			const { data } = await userService.register(user)
			return data
		} catch (err) {
			const e = err as AxiosError
			return rejectWithValue(e.response.data)
		}
	}
)

const login = createAsyncThunk(
	'login/userSlice',
	async (user: ILogin, { rejectWithValue }) => {
		try {
			const { data } = await userService.login(user)
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
		build
			.addCase(register.fulfilled, (state, actions) => {
				state.response = actions.payload.response
				state.message = actions.payload.message
			})
			.addCase(login.fulfilled, (state, actions) => {
				state.response = actions.payload.response
				state.message = actions.payload.message
				state.user = state.response ? actions.payload.user : null
				state.user_notifications = state.response
					? actions.payload.user_notifications
					: 0
			}),
})

const { reducer: userReducer, actions } = userSlice

const userActions = {
	...actions,
	register,
	login,
}
export { userActions, userReducer }
