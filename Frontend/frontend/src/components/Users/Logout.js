import { useDispatch, useSelector } from 'react-redux'
import { UserActions } from '../../redux/slice/UserSlice'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { clearStorage } from '../../localStorage/storage'

export const Logout = () => {
	const dispatch = useDispatch()
	const redirect = useNavigate()
	useEffect(() => {
		dispatch(UserActions.logout())

		return redirect('/')
	})
}
