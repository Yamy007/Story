import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { Button, FormControl, TextField } from '@mui/material'
import styles from './style.module.css'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import CSRFToken from '../CSRFToken/CSRFToken'
export const Register = () => {
	const { register, handleSubmit } = useForm()
	const [value, setValue] = useState('')

	const onSubmit = data => {
		console.log(value)
		fetch('http://127.0.0.1:8000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': 'j5quChpCagGI6KQc9PK3jxYdl5F7H8pr',
			},
			body: JSON.stringify(data),
		})
			.then(value => value.json())
			.then(value => console.log(value))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<CSRFToken />
			<input value={value} onChange={e => setValue(e.target.value)} />
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
