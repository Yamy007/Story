import React from 'react'
import { Header } from './Header'
export const Home = ({ isDark, setIsDark }) => {
	return (
		<>
			<Header isDark={isDark} setIsDark={setIsDark} />{' '}
		</>
	)
}
