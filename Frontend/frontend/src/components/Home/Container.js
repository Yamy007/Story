import React from 'react'
import { Box, Pagination } from '@mui/material'
import { Storys } from '../Story/Storys'

export const Container = ({ story, page }) => {
	return (
		<Box>
			<Storys />
			<Pagination
				variant='outlined'
				color='secondary'
				count={100}
				page={page}
				onPageChange={handleChangePage}
			/>
		</Box>
	)
}
