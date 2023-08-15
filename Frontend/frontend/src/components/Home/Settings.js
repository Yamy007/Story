import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, TextField } from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'
import { UserAuth } from '../api/user'

export const Settings = () => {
	const [avatar, setAvatar] = useState(null)

	useEffect(() => {
		const respose = UserAuth().check()
		console.log(respose)
	}, [])

	const handleSubmit = e => {
		UserAuth().profileUpdate()
		e.preventDefault()
	}
	return (
		<Container maxWidth='md' sx={{ paddingTop: '10vh' }}>
			<form onSubmit={handleSubmit}>
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
						/>
						<TextField
							fullWidth
							label='Last Name'
							name='surname'
							margin='normal'
						/>
						<TextField fullWidth label='Email' name='email' margin='normal' />
						<TextField
							fullWidth
							label='Bio'
							name='bio'
							multiline
							rows={4}
							margin='normal'
						/>
						<TextField fullWidth label='Phone' name='phone' margin='normal' />
						<TextField
							fullWidth
							label='Address'
							name='address'
							multiline
							rows={2}
							margin='normal'
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
