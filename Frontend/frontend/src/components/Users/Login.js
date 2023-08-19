import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../api/user'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../redux/slice/UserSlice'
import { userService } from '../../services/userService'

// function checkStartingLetters(words, letters) {
// 	if (letters === '') {
// 		return true
// 	}
// 	const pattern = new RegExp(`^${letters}`, 'i')
// 	for (const word of words) {
// 		if (pattern.test(word)) {
// 			return true
// 		}
// 	}
// 	return false
// }

export const Login = () => {
	const { register, handleSubmit } = useForm()

	// let redirect = useNavigate()
	const dispatch = useDispatch()

	const onSubmit = async data => {
		console.log(data)
		const response = dispatch(UserActions.login(data))
		console.log(response)
		// if (response.data?.response || response.data?.SUCCESS) {
		// 	localStorage.setItem(
		// 		'User',
		// 		JSON.stringify({
		// 			user: response.data.user,
		// 			token: response.data.token,
		// 		})
		// 	)
		// dispatch(UserActions.setToken(response.data.token))
		// dispatch(UserActions.setUser(response.data.user))
		// 	if (response?.data.SUCCESS) {
		// 		return redirect('/')
		// 	}
		// }
	}

	return (
		<Box style={{ background: '#BCB8B8' }} className={styles.container}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.wrapper}
				style={{ paddingTop: '10vh' }}
			>
				<TextField
					label='username'
					type='text'
					sx={{ width: '30vw' }}
					{...register('login', { required: true })}
					// onChange={e => setCheck(checkStartingLetters(data, e.target.value))}
					// error={!check}
				/>
				<TextField
					label='password'
					sx={{ width: '30vw' }}
					type='password'
					{...register('password', { required: true })}
				/>
				<Button
					type='submit'
					variant='contained'
					size='large'
					sx={{ width: '28vh' }}
				>
					Login
				</Button>
			</form>
		</Box>
	)
}
