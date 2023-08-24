import { createSlice } from '@reduxjs/toolkit'
import { getStorage, setStorage } from '../../localStorage/storage'

const innitValue = {
	theme: 'dark',
}

export const ThemeSlice = createSlice({
	name: 'theme/slice',
	initialState: getStorage('Theme') || innitValue,
	reducers: {
		setTheme: (state, actions) => {
			const data = { ...state, theme: actions.payload.theme }
			setStorage('Theme', data)
			return data
		},
	},
})

const {
	reducer: themeReduce,
	actions: { setTheme },
} = ThemeSlice

export { themeReduce, setTheme }
