import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, TextField } from '@mui/material'

export const Settings = () => {
	const [formData, setFormData] = useState({
		photo: null, // Змінюємо на null, оскільки тепер це буде об'єкт файлу
		name: '',
		surname: '',
		email: '',
		bio: '',
		phone: '',
		address: '',
	})

	const handlePhotoChange = event => {
		const selectedPhoto = event.target.files[0]
		setFormData(prevData => ({
			...prevData,
			photo: selectedPhoto,
		}))
	}
	const handleInputChange = event => {
		const { name, value } = event.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = event => {
		event.preventDefault()
		console.log(formData)
	}

	return (
		<Container maxWidth='md' sx={{ paddingTop: '10vh' }}>
			<Grid container spacing={3} alignItems='center'>
				<Grid item xs={12} align='center'>
					<Avatar alt='User Photo' src='' />
					<input type='file' accept='image/*' onChange={handlePhotoChange} />
				</Grid>
				<Grid item xs={12}>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label='First Name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							label='Last Name'
							name='surname'
							value={formData.surname}
							onChange={handleInputChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							label='Email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							label='Bio'
							name='bio'
							value={formData.bio}
							onChange={handleInputChange}
							multiline
							rows={4}
							margin='normal'
						/>
						<TextField
							fullWidth
							label='Phone'
							name='phone'
							value={formData.phone}
							onChange={handleInputChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							label='Address'
							name='address'
							value={formData.address}
							onChange={handleInputChange}
							multiline
							rows={2}
							margin='normal'
						/>
						<Button type='submit' variant='contained' color='primary'>
							Save Changes
						</Button>
					</form>
				</Grid>
			</Grid>
		</Container>
	)
}
