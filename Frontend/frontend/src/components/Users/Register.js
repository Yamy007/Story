import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import styles from './style.module.css'
import { User } from '../api/user'
import { useNavigate } from 'react-router-dom'
import { UserActions } from '../../reduxCore/actions/UserAction'
import { useDispatch } from 'react-redux'

export const Register = () => {
	const { register, handleSubmit } = useForm()
	const [data, setData] = useState({})
	let redirect = useNavigate()
	const dispatch = useDispatch()
	const onSubmit = async data => {
		const response = await User().registration(data)
		setData(response)
		const { username, password } = data
		if (response.data?.response) {
			const response = await User().login({ username, password })
			if (response.data?.response || response.data?.SUCCESS) {
				localStorage.setItem(
					'User',
					JSON.stringify({
						user: response.data.user,
						token: response.data.token,
					})
				)
				dispatch(UserActions.setToken(response.data.token))
				dispatch(UserActions.setUser(response.data.user))
				if (response?.data.SUCCESS) {
					return redirect('/')
				}
			}
		}
	}

	return (
		<Box className={styles.container} style={{ background: '#BCB8B8' }}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
				<TextField
					sx={{ width: '30vw' }}
					variant='outlined'
					label='name'
					type='text'
					{...register('username')}
				/>
				<TextField
					sx={{ width: '30vw' }}
					variant='outlined'
					label='email'
					type='email'
					{...register('email')}
				/>
				<TextField
					sx={{ width: '30vw' }}
					variant='outlined'
					label='password'
					type='text'
					//password
					{...register('password')}
				/>
				<TextField
					sx={{ width: '30vw' }}
					variant='outlined'
					label='re-password'
					type='password'
					{...register('re_password')}
				/>
				<Button
					type='submit'
					variant='contained'
					size='large'
					sx={{ width: '28vh' }}
				>
					Register
				</Button>

				<Typography variant='h5' component='p'>
					{data ? data?.data?.response : null}
				</Typography>
			</form>
		</Box>
	)
}
