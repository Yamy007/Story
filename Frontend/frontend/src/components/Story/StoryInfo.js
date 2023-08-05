import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import styles from './Style/Style.module.css'
import { api } from '../api/api'
export const StoryInfo = ({ isDark }) => {
	const { id } = useParams()
	console.log('id', id)
	const [story, setStory] = useState()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`get_all_posts?story=${id}`)
				console.log('response', response.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [])
	return (
		<Box bgcolor={isDark ? '#000000e8' : '#EBEBEB'} className={styles.wrapper}>
			<Box>
				<Typography variant='h5' component='p'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis commodi
					sequi consequatur dolor incidunt, deserunt ad illo maxime ipsum minus
					quod repudiandae amet natus modi aut aspernatur ut voluptates nisi?
				</Typography>
			</Box>
		</Box>
	)
}
