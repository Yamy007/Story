import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { storyActions } from '../redux'

export const Home = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(storyActions.getAll())
	})
	return <div>Home</div>
}
