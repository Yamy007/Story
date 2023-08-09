import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import styles from './style.module.css'
import { UserAuth } from '../api/user'

export const Register = ({ onSave }) => {
	const { register, handleSubmit } = useForm()
	const [data, setData] = useState({})
	const onSubmit = async data => {
		onSave(prev => !prev)
		setData(await UserAuth().Registration(data))
		console.log(await UserAuth().Registration(data))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<TextField
				variant='outlined'
				label='name'
				type='text'
				{...register('username')}
			/>
			<TextField
				variant='outlined'
				label='email'
				type='email'
				{...register('email')}
			/>
			<TextField
				variant='outlined'
				label='password'
				type='password'
				{...register('password')}
			/>
			<TextField
				variant='outlined'
				label='re-password'
				type='password'
				{...register('re_password')}
			/>
			<Button type='submit' variant='contained' size='large'>
				Register
			</Button>

			<Typography variant='h5' component='p'>
				{data ? data?.data?.response : null}
			</Typography>
		</form>
	)
}
