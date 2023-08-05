import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Theme/darkTheme'
import { lightTheme } from './Theme/lightTheme'
import { Header } from './components/Home/Header'
import { Storys } from './components/Story/Storys'
import { Box } from '@mui/material'
function App() {
	const [isDark, setIsDark] = useState(false)
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Header isDark={isDark} setIsDark={setIsDark} />
			<Routes>
				<Route
					path='/'
					element={<Home isDark={isDark} setIsDark={setIsDark} />}
				></Route>
				<Route path='/story' element={<Storys />}></Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App
