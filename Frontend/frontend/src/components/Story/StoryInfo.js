import React, { useState, useEffect } from 'react'
import { Box, Typography, Pagination } from '@mui/material'
import { useParams } from 'react-router-dom'
import styles from './Style/Style.module.css'
import { api } from '../api/api'

export const StoryInfo = ({ isDark }) => {
	const { id } = useParams()
	const [story, setStory] = useState()
	const [page, setPage] = useState(1)
	const [pg, setPg] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(
					`get_all_posts?story=${id}&story_page=${page}`
				)
				setStory(response.data.story_data)
				setPg(response.data.story_page)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [page])

	return (
		<Box bgcolor={isDark ? '#000000e8' : '#EBEBEB'} className={styles.wrapper}>
			<Box className={styles.content}>
				<Typography variant='h5' component='p'>
					{story?.body[0]}
				</Typography>
			</Box>
			<Pagination
				variant='outlined'
				color='secondary'
				sx={{ marginBottom: '15px' }}
				count={pg?.story_page_count}
				page={page}
				onChange={(e, newPage) => {
					setPage(newPage)
				}}
			/>
		</Box>
	)
}
