import React, { useEffect } from 'react'
import { useState } from 'react'
import { Story } from './Story'
import { api } from '../api/api'
import { Box } from '@mui/material'
import styles from './Style/Story.module.css'
import { Container } from '../Home/Container'

export const Storys = () => {
	const [story, setStory] = useState()
	const [data, setData] = useState(1)
	const [page, setPage] = useState(1)
	useEffect(() => {
		const FetchData = async () => {
			try {
				const response = await api.get(`get_all_posts?page=${page}`)
				setData(response.page)
				setStory(response.data.data)
			} catch (err) {
				console.log(err)
			}
		}
		FetchData()
	}, [page])
	return (
		<Box className={styles.story}>
			<Container story={story} data={data} setPage={setPage} page={page} />
		</Box>
	)
}
