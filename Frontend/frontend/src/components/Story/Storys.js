import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container } from '../Home/Container'
import { PostActions } from '../../reduxCore/actions/PostActions.js'
import { useDispatch } from 'react-redux'
import { StoryFetch } from './StoryApi/StoryFetch'

export const Storys = ({ isDark }) => {
	const [page, setPage] = useState(1)

	const dispatch = useDispatch()
	useEffect(() => {
		const FetchData = async () => {
			dispatch(PostActions.setPost(await StoryFetch.getStory(page)))
		}
		FetchData()
	}, [dispatch, page])

	return (
		<>
			<Container setPage={setPage} isDark={isDark} />
		</>
	)
}
