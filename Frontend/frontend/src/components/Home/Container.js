import React from 'react'
import { Box, Pagination } from '@mui/material'
import { Story } from '../Story/Story'
import styles from './Style/Style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { storyActions } from '../../redux/slice/StorySlice'
export const Container = ({ isDark }) => {
	const { number_of_pages } = useSelector(state => state.story.page) || {}
	let { current } = useSelector(state => state.story.page) || {}
	const dispatch = useDispatch()
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
					count={number_of_pages}
					page={current}
					onChange={(e, newPage) => dispatch(storyActions.allStory(newPage))}
				/>
			</Box>
		</Box>
	)
}
