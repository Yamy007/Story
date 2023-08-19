import React, { useEffect, useState } from 'react'
import {
	Alert,
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	TextField,
} from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'
import { User } from '../api/user'
import { useSelector } from 'react-redux'
import { set, useForm } from 'react-hook-form'
export const Settings = () => {
	//image
	const [selectedImage, setSelectedImage] = useState(null)
	const img = useSelector(state => state.users?.user?.image)
	const avatar = 'http://127.0.0.1:8000' + img
	const [image, setImage] = useState('')

	const handleImageChange = event => {
		setSelectedImage(event.target.files[0])
		setImage(URL.createObjectURL(event.target.files[0]))
	}
	const token = useSelector(state => state.users.token)
	const formData = new FormData()

	const handleUpload = async () => {
		formData.append('image', selectedImage)
		try {
			const response = await axios.post(
				'http://127.0.0.1:8000/users/update_user_profile',

				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'X-CSRFToken': Cookies.get('csrftoken'),
						Authorization: `Token ${token}`,
					},
					withCredentials: true,
				}
			)
			console.log('Image uploaded successfully', response.data)
		} catch (error) {
			console.error('Error uploading image', error)
		}
	}

	//data
	const [type, setType] = useState('info') //1: 'success', 2: 'error', 3: 'warning', 4: 'info',
	const [message, setMessage] = useState('Alert now working')
	const [notificationVisible, setNotificationVisible] = useState(false)

	const { first_name, last_name, email, bio, phone, address } =
		JSON.parse(localStorage.getItem('User'))?.user || {}
	const { register, handleSubmit } = useForm({
		defaultValues: {
			first_name: first_name,
			last_name: last_name,
			email: email,
			bio: bio,
			phone: phone,
			address: address,
		},
	})
	const onSubmit = async data => {
		for (const key in data) {
			if (data[key] === '') {
				delete data[key]
			}
		}
		const response = await User().profileUpdate(token, data)

		if (response.data?.success) {
			setType('success')
			setMessage('Profile updated successfully')
		} else {
			setType('error')
			setMessage('Profile updated failed')
		}
		setNotificationVisible(true)
		setTimeout(() => setNotificationVisible(false), 5000)
	}

	return (
		<Container maxWidth='md' sx={{ paddingTop: '10vh' }}>
			<Grid container spacing={3} alignItems='center'>
				{notificationVisible && (
					<Alert
						severity={type}
						sx={{
							position: 'absolute',
							top: '25vh',
							right: '0vh',
							width: '20%',
							opacity: '1',
							borderRadius: '10px 0 0 10px',
						}}
					>
						{message}
					</Alert>
				)}
				<Grid item xs={12} align='center'>
					<Avatar
						src={image ? image : avatar}
						alt='avatar'
						sx={{ height: '15vh', width: '15vh', margin: '1.2em' }}
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '20vw',
						}}
					>
						<Button
							variant='contained'
							component='label'
							sx={{ marginLeft: '2em' }}
						>
							Upload File
							<input type='file' hidden onChange={handleImageChange} />
						</Button>
						<Button
							variant='contained'
							component='label'
							onClick={handleUpload}
						>
							Save Changes
						</Button>
					</Box>
				</Grid>
				<form onSubmit={handleSubmit(onSubmit)}>
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
						<TextField
							fullWidth
							label='Email'
							name='email'
							margin='normal'
							{...register('email')}
						/>
						<TextField
							fullWidth
							label='Bio'
							name='bio'
							multiline
							rows={4}
							margin='normal'
							{...register('bio')}
						/>
						<TextField fullWidth label='Phone' name='phone' margin='normal' />
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
				</form>
			</Grid>
		</Container>
	)
}

// import React, { useState } from 'react'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import Cookies from 'js-cookie'

// export const Settings = () => {
// 	const [selectedImage, setSelectedImage] = useState(null)

// 	const handleImageChange = event => {
// 		setSelectedImage(event.target.files[0])
// 	}
// 	const token = useSelector(state => state.users.token)

// 	const handleUpload = async () => {
// 		const formData = new FormData()
// 		formData.append('image', selectedImage)

// 		try {
// 			const response = await axios.post(
// 				'http://127.0.0.1:8000/users/update_user_profile',

// 				formData,
// 				{
// 					headers: {
// 						'Content-Type': 'multipart/form-data',
// 						'X-CSRFToken': Cookies.get('csrftoken'),
// 						Authorization: `Token ${token}`,
// 					},
// 					withCredentials: true,
// 				}
// 			)
// 			console.log('Image uploaded successfully', response.data)
// 		} catch (error) {
// 			console.error('Error uploading image', error)
// 		}
// 	}

// 	return (
// 		<div style={{ paddingTop: '20vh' }}>
// 			<input type='file' onChange={handleImageChange} />
// 			<button onClick={handleUpload}>Upload Image</button>
// 		</div>
// 	)
// }
