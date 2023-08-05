import React from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

export const StoryInfo = () => {
	const { id } = useParams()
	console.log('id', id)
	return <Box></Box>
}
