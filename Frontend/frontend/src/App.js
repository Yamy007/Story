import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Theme/darkTheme'
import { lightTheme } from './Theme/lightTheme'

function App() {
	const [isDark, setIsDark] = useState(false)
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Routes>
				<Route
					path='/'
					element={<Home isDark={isDark} setIsDark={setIsDark} />}
				></Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App
