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
function App() {
	const [isDark, setIsDark] = useState(true)
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Header isDark={isDark} setIsDark={setIsDark} />
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
			</Routes>
		</ThemeProvider>
	)
}

export default App
