import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { user } from '../api/user'
export const Login = () => {
	const { register, handleSubmit } = useForm()

	const onSubmit = data => {
		user.post('login', data).then(value => console.log(value))
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField label='username' {...register('username')} />
			<TextField label='password' type='password' {...register('password')} />
			<Button variant='text' type='submit'>
				Login
			</Button>
		</form>
	)
}
