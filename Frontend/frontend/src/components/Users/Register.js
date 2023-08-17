import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import styles from './style.module.css'
import { UserAuth } from '../api/user'

export const Register = ({ onSave }) => {
	const { register, handleSubmit } = useForm()
	const [data, setData] = useState({})
	const onSubmit = async data => {
		onSave(prev => !prev)
		const check = await UserAuth().checkCookie()
		const register = await UserAuth().Registration(data)
		setData(register)
		console.log(register)
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
					type='password'
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
