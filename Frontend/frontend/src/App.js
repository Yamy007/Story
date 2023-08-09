import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Theme/darkTheme'
import { lightTheme } from './Theme/lightTheme'
import { Header } from './components/Home/Header'
import { Storys } from './components/Story/Storys'
import { Box } from '@mui/material'
import { StoryInfo } from './components/Story/StoryInfo'
import { Color } from './components/ColorGenre/Color'
import { Login } from './components/Users/Login'
import { Logout } from './components/Users/Logout'
function App() {
	const [isDark, setIsDark] = useState(true)
	const [save, onSave] = useState(false)
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Header isDark={isDark} setIsDark={setIsDark} save={save} />
			<Routes>
				<Route
					path='/'
					element={<Home isDark={isDark} setIsDark={setIsDark} />}
				></Route>
				<Route
					path='/story'
					element={<Storys isDark={isDark} setIsDark={setIsDark} />}
				></Route>
				<Route
					path='/story/:id'
					element={<StoryInfo isDark={isDark} />}
				></Route>

				<Route
					path='user/login'
					element={<Login isDark={isDark} onSave={onSave} />}
				></Route>

				<Route
					path='user/register'
					element={<Logout isDark={isDark} onSave={onSave} />}
				></Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App
