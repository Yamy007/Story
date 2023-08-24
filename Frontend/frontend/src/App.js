import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Theme/darkTheme'
import { lightTheme } from './Theme/lightTheme'
import { Header } from './components/Home/Header'
import { Storys } from './components/Story/Storys'
// import { StoryInfo } from './components/Story/StoryInfo'
import { Login } from './components/Users/Login'
import { Register } from './components/Users/Register'
import { Settings } from './components/Home/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from './services/userService'
import { Button } from '@mui/material'
import { UserActions } from './redux/slice/UserSlice'
import { Logout } from './components/Users/Logout'
import { innitToken } from './services/csrfService'
import { getStorage } from './localStorage/storage'
import { theme } from './constants/theme'
function App() {
	const isActiveTheme = useSelector(state => state.theme.theme)
	const [isDark, setIsDark] = useState(true)
	const [save, onSave] = useState(false)
	return (
		<ThemeProvider theme={theme[isActiveTheme]}>
			<Header
				isDark={isDark}
				setIsDark={setIsDark}
				save={save}
				onSave={onSave}
			/>

			<Routes>
				<Route
					path='/'
					element={<Home isDark={isDark} setIsDark={setIsDark} />}
				></Route>
				<Route
					path='/story'
					element={<Storys isDark={isDark} setIsDark={setIsDark} />}
				></Route>

				<Route path='/user/login' element={<Login isDark={isDark} />}></Route>
				<Route
					path='/user/register'
					element={<Register isDark={isDark} />}
				></Route>
				<Route path='/user/logout' element={<Logout isDark={isDark} />}></Route>

				<Route
					path='/user/settings'
					element={<Settings isDark={isDark} onSave={onSave} />}
				></Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App
