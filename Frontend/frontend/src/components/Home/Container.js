import React from 'react'
import { Box, Pagination } from '@mui/material'
import { Story } from '../Story/Story'
import styles from './Style/Style.module.css'
export const Container = ({ story, data, setPage, page }) => {
	return (
		<Box className={styles.container}>
			<Box className={styles.wrapper}>
				<Story story={story} />
			</Box>
			<Box className={styles.pagination}>
				<Pagination
					variant='outlined'
					color='secondary'
					count={11}
					page={page}
					onChange={(e, newPage) => {
						setPage(newPage)
					}}
				/>
			</Box>
		</Box>
	)
}
