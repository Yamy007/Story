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
	const [check, setCheck] = useState(false)
	useEffect(() => {
		fetch('http://localhost:8000/auth/get_all_users')
			.then(res => res.json())
			.then(res => setData(res))
			.catch(err => console.log(err))
	}, [onSave])

	let redirect = useNavigate()
	const onSubmit = async data => {
		const response = await UserAuth().login(data)
		onSave(prev => !prev)
		if (response.data.response) {
			return redirect('/')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '10vh' }}>
			<TextField
				label='username'
				type='text'
				onChange={e => setCheck(checkStartingLetters(data, e.target.value))}
				error={!check}
			/>
			<TextField label='password' type='password' {...register('password')} />
			<Button variant='text' type='submit'>
				Login
			</Button>
		</form>
	)
}
