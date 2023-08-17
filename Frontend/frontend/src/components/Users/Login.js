import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserAuth } from '../api/user'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import myInitObject from '../api/login_data'

function checkStartingLetters(words, letters) {
	if (letters === '') {
		return true
	}
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
	const [check, setCheck] = useState(true)
	useEffect(() => {
		fetch('http://localhost:8000/auth/get_all_users')
			.then(res => res.json())
			.then(res => setData(res))
			.catch(err => console.log(err))
	}, [onSave])

	let redirect = useNavigate()
	const onSubmit = async data => {
		const check = await UserAuth().checkCookie()
		const response = await UserAuth().login(data)
		setData(response)
		onSave(prev => !prev)
		if (response?.data?.SUCCESS == "LOGGED IN") {
			myInitObject = response
			Object.freeze(myInitObject)
			console.log(myInitObject)
			return redirect('/')
		}
	}
	// const HandleSubmit = async e => {
	// 	const response = await UserAuth().profileUpdate()
	// 	console.log(response)
	// 	e.preventDefault()
	// }
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
					onChange={e => setCheck(checkStartingLetters(data, e.target.value))}
					{...register('username')}
					error={!check}
				/>
				<TextField
					label='password'
					sx={{ width: '30vw' }}
					type='password'
					{...register('password')}
				/>
				<Button
					type='submit'
					variant='contained'
					size='large'
					sx={{ width: '28vh' }}
				>
					Login
				</Button>
				{/* <Button
					onClick={HandleSubmit}
					type='submit'
					variant='contained'
					size='large'
					sx={{ width: '28vh' }}
				>
					Logissfn
				</Button> */}
			</form>
		</Box>
	)
}
