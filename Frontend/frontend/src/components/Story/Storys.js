import React, { useEffect } from 'react'
import { Container } from '../Home/Container'
import { useDispatch, useSelector } from 'react-redux'
import { storyActions } from '../../redux/slice/StorySlice'
import { genreActions } from '../../redux/slice/GenreSlice'

export const Storys = ({ isDark }) => {
	const dispatch = useDispatch()
	const { page } = useSelector(state => state.story) || {}
	const FetchData = async page => {
		dispatch(storyActions.allStory(page))
		dispatch(genreActions.allGenre())
	}

	useEffect(() => {
		FetchData(page?.current || 1)
	}, [])

	return (
		<>
			<Container isDark={isDark} />
		</>
	)
}
