import {
	createAsyncThunk,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from '@reduxjs/toolkit'
import { userService } from '../../services/userService'
import Cookies from 'js-cookie'
import {
	clearStorage,
	getStorage,
	setStorage,
} from '../../localStorage/storage'

const initialState = {
	user: {
		id: null,
		image: null,
		username: '',
		is_premium: false,
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		address: '',
		bio: '',
		user: null,
	},
	message: '',
	user_notifications: 0,
	isAutofication: false,
}

const login = createAsyncThunk(
	'userSlice/login',
	async ({ login, password }, thunkAPI) => {
		try {
			const { data } = await userService.login(login, password)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

const registration = createAsyncThunk(
	'userSlice/register',
	async (register, thunkAPI) => {
		try {
			const { data } = await userService.registration(register)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

const logout = createAsyncThunk('userSlice/logout', async (_, thunkAPI) => {
	try {
		const { data } = await userService.logout()
		return data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

const updateImage = createAsyncThunk(
	'userSlice/updateImage',
	async (image, thunkAPI) => {
		try {
			const { data } = await userService.updateImage(image)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

const updateProfile = createAsyncThunk(
	'userSlice/updateProfile',
	async (user, thunkAPI) => {
		try {
			const { data } = await userService.updateProfile(user)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

export const UserSlice = createSlice({
	name: 'userSlice',
	initialState: getStorage('User') ? getStorage('User') : initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(login.fulfilled, (state, actions) => {
				const data = {
					...state,
					user: actions.payload.user || state.user,
					user_notifications:
						actions.payload.user_notifications || state.user_notifications,
					message: actions.payload?.message,
					isAutofication: actions.payload.response ? true : false,
				}
				setStorage('User', data)
				return data
			})
			.addCase(registration.fulfilled, (state, actions) => {
				return {
					...state,
					message: actions.payload?.message,
				}
			})
			.addCase(logout.fulfilled, (state, actions) => {
				clearStorage('User')
				return {
					...state,
					user: initialState.user,
					isAutofication: actions.payload.response ? false : true,
					message: actions.payload?.message,
				}
			})
			.addCase(updateImage.fulfilled, (state, actions) => {
				const data = {
					...state,
					message: actions.payload.message,
					user: actions.payload.data || state.user,
				}
				setStorage('User', data)
				return data
			})
			.addCase(updateProfile.fulfilled, (state, actions) => {
				const data = {
					...state,
					message: actions.payload.message,
					user: actions.payload.data || state.user,
				}
				setStorage('User', data)
				return data
			}),
})

const { reducer: userReducer, actions } = UserSlice

const UserActions = {
	login,
	registration,
	logout,
	updateImage,
	updateProfile,
}

export { userReducer, UserActions }
