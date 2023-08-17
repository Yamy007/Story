import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import axios from 'axios'
import { UserAuth } from '../api/user'

export const Settings = () => {
	const [avatar, setAvatar] = useState(null)
	const {register, handleSubmit} = useForm()
	const [data, setData] = useState([])

	// useEffect(() => {
	// 	const respose = UserAuth().check()
	// 	console.log(respose)
	// }, [])

	const onSubmit = async data => {
		setData(await UserAuth().profileUpdate(data))
		const response = await UserAuth().profileUpdate(data)
		console.log(response)
	}
	return (
		<Container maxWidth='md' sx={{ paddingTop: '10vh' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} alignItems='center'>
					<Grid item xs={12} align='center'>
						<Avatar alt='User Photo' src='' />
						<input type='file' onChange={e => setAvatar(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label='First Name'
							name='name'
							margin='normal'
							{...register('first_name')}
						/>
						<TextField
							fullWidth
							label='Last Name'
							name='surname'
							margin='normal'
							{...register('last_name')}
						/>
						<TextField fullWidth label='Email' name='email' margin='normal' {...register('email')}/>
						<TextField
							fullWidth
							label='Bio'
							name='bio'
							multiline
							rows={4}
							margin='normal'
							{...register('bio')}
						/>
						<TextField fullWidth label='Phone' name='phone' margin='normal' {...register('phone')}/>
						<TextField
							fullWidth
							label='Address'
							name='address'
							multiline
							rows={2}
							margin='normal'
							{...register('address')}
						/>
						<Button type='submit' variant='contained' color='primary'>
							Save Changes
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}
