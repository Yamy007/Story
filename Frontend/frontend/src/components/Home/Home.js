import React from 'react'
import { Register } from '../Users/Register'
import { Box } from '@mui/material'
export const Home = ({ isDark, setIsDark }) => {
	return (
		<Box
			sx={{ padding: '10vh', minHeight: '80vh' }}
			bgcolor={isDark ? '#838181' : '#EBEBEB'}
		>
			<Register />
		</Box>
	)
}
