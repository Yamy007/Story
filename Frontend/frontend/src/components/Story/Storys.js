import React, { useEffect } from 'react'
import { useState } from 'react'
import { api } from '../api/api'
import { Box } from '@mui/material'
import { Container } from '../Home/Container'

export const Storys = ({ isDark }) => {
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
		<>
			<Container
				story={story}
				data={data}
				setPage={setPage}
				page={page}
				isDark={isDark}
			/>
		</>
	)
}
