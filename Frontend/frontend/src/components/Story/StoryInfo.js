import React, { useState, useEffect } from 'react'
import { Box, Typography, Pagination } from '@mui/material'
import { useParams } from 'react-router-dom'
import styles from './Style/Style.module.css'
import { StoryActions } from '../../reduxCore/actions/StoryActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { StoryFetch } from './StoryApi/StoryFetch'

export const StoryInfo = ({ isDark }) => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const story = useSelector(state => state.story.data)
	const allPage = useSelector(state => state.story.page.story_page_count)

	const [page, setPage] = useState(1)

	useEffect(() => {
		const FetchData = async () => {
			dispatch(StoryActions.setStory(await StoryFetch.getStoryInfo(id, page)))
		}
		FetchData()
	}, [dispatch, id, page])

	return (
		<Box bgcolor={isDark ? '#000000e8' : '#EBEBEB'} className={styles.wrapper}>
			<Box className={styles.content}>
				<Typography
					variant='h5'
					component='p'
					style={isDark ? { color: '#B8B8B8' } : { color: '#363434' }}
				>
					{story.body}
				</Typography>
			</Box>
			<Pagination
				variant='outlined'
				color='secondary'
				sx={{ marginBottom: '15px' }}
				count={allPage}
				page={page}
				onChange={(e, newPage) => {
					setPage(newPage)
				}}
			/>
		</Box>
	)
}
