import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserAuth } from '../api/user'
import { useNavigate } from 'react-router-dom'

function checkStartingLetters(words, letters) {
	const pattern = new RegExp(`^${letters}`, 'i')
	for (const word of words) {
		if (pattern.test(word)) {
			return true
		}
	}
	return false
}

export const Login = ({ onSave }) => {
	const { register, handleSubmit } = useForm()
	const [data, setData] = useState([])
	useEffect(() => {
		fetch('http://localhost:8000/auth/get_all_users')
			.then(res => res.json())
			.then(data => setData(data))
	}, [onSave])
	let redirect = useNavigate()
	const onSubmit = async data => {
		const response = await UserAuth().login(data)
		onSave(prev => !prev)
		if (response.data.response) {
			return redirect('/')
		}
	}
	console.log(data)
	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '10vh' }}>
			<TextField label='username' {...register('username')} />
			<TextField label='password' type='password' {...register('password')} />
			<Button variant='text' type='submit'>
				Login
			</Button>
		</form>
	)
}
