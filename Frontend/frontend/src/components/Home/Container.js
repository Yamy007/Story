import React, { useState } from 'react'
import { Box, Pagination } from '@mui/material'
import { Story } from '../Story/Story'

export const Container = ({ story, data, setPage, page }) => {
	const [p, setP] = useState(1)
	return (
		<>
			<Story story={story} />
			<Pagination
				variant='outlined'
				color='secondary'
				count={11}
				page={page}
				onChange={(e, newPage) => {
					setPage(newPage)
				}}
			/>
		</>
	)
}
