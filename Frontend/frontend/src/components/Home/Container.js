import React from 'react'
import { Box, Pagination } from '@mui/material'
import { Story } from '../Story/Story'
import styles from './Style/Style.module.css'
import { useSelector } from 'react-redux'
export const Container = ({ setPage, isDark }) => {
	const AllPage = useSelector(state => state.posts.page.number_of_pages)
	let CurrentPage = useSelector(state => state.posts.page.current)

	return (
		<Box
			className={styles.container}
			bgcolor={isDark ? '#000000e8' : '#EBEBEB'}
		>
			<Box className={styles.wrapper}>
				<Story isDark={isDark} />
			</Box>

			<Box className={styles.pagination}>
				<Pagination
					variant='outlined'
					color='secondary'
					count={AllPage}
					page={CurrentPage}
					onChange={(e, newPage) => {
						setPage(newPage)
					}}
				/>
			</Box>
		</Box>
	)
}
