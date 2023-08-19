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
import { useDispatch, useSelector } from 'react-redux'
import { set, useForm } from 'react-hook-form'
import { UserActions } from '../../redux/slice/UserSlice'
import { baseURL } from '../../constants/urls'
export const Settings = () => {
	//redux
	const dispatch = useDispatch()

	//image
	const [selectedImage, setSelectedImage] = useState(null)
	const avatar = baseURL + useSelector(state => state.user.user.image)
	const [image, setImage] = useState(avatar)

	const handleImageChange = event => {
		setSelectedImage(event.target.files[0])
		setImage(URL.createObjectURL(event.target.files[0]))
	}

	const handleUpload = async () => {
		const formData = new FormData()
		formData.append('image', selectedImage)
		try {
			const response = dispatch(await UserActions.updateImage(formData))
			console.log('Image uploaded successfully', response.data)
		} catch (error) {
			console.error('Error uploading image', error)
		}
	}

	//data
	const [type, setType] = useState('info') //1: 'success', 2: 'error', 3: 'warning', 4: 'info',
	const [message, setMessage] = useState('Alert now working')
	const [notificationVisible, setNotificationVisible] = useState(false)

	const { first_name, last_name, email, bio, phone, address } = useSelector(
		state => state.user.user
	)
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
		const response = await dispatch(UserActions.updateProfile(data))
		console.log(response)
		// if (response.data?.success) {
		// 	setType('success')
		// 	setMessage('Profile updated successfully')
		// } else {
		// 	setType('error')
		// 	setMessage('Profile updated failed')
		// }
		// setNotificationVisible(true)
		// setTimeout(() => setNotificationVisible(false), 5000)
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
						<TextField
							fullWidth
							label='Phone'
							name='phone'
							margin='normal'
							{...register('phone')}
						/>
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
