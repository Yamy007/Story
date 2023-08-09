import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { UserAuth } from '../api/user'
export const Login = ({ onSave }) => {
	const { register, handleSubmit } = useForm()
	const onSubmit = async data => {
		console.log(await UserAuth().login(data))
		onSave(prev => !prev)
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
