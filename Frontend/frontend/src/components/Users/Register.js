import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import styles from './style.module.css'
import { user } from '../api/user'

export const Register = () => {
	const { register, handleSubmit } = useForm()

	const onSubmit = data => {
		user.post('register', data).then(value => console.log(value))
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
		</form>
	)
}
