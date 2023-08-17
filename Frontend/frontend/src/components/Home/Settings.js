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
import { useForm } from 'react-hook-form'
export const Settings = () => {
	//state

	//token
	const token = useSelector(state => state.users.token)

	//notification -------
	const [type, setType] = useState('info') //1: 'success', 2: 'error', 3: 'warning', 4: 'info',
	const [message, setMessage] = useState('Alert now working')
	const [notificationVisible, setNotificationVisible] = useState(false)
	//notification -------

	//image ----------
	const [selectedImage, setSelectedImage] = useState(null)
	const [image, setImage] = useState('')
	const img = useSelector(state => state.users?.user?.image)
	const avatar = 'http://127.0.0.1:8000' + img
	//image ----------

	//image innit
	useEffect(() => {
		const image = JSON.parse(localStorage.getItem('User'))?.user?.image
		if (image) {
			setImage(image)
		}
	}, [])

	//notification function
	const notification = (type, message) => {
		setType(type)
		setMessage(message)
		setNotificationVisible(true)
		setTimeout(() => setNotificationVisible(false), 5000)
	}

	//image upload
	const handleImageChange = event => {
		setSelectedImage(event.target.files[0])
		setImage(URL.createObjectURL(event.target.files[0]))
	}

	const formData = new FormData()
	const data = JSON.parse(localStorage.getItem('User'))
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
			if (response.data?.response) {
				setType('success')
				const newData = {
					...data,
					user: { ...data.user, image: image },
				}
				localStorage.setItem('User', JSON.stringify(newData))
				notification('success', 'Profile image updated successfully')
				setSelectedImage(null)
			} else {
				notification('error', 'Profile image updated failed')
			}
			console.log('Image uploaded successfully', response.data)
		} catch (error) {
			console.error('Error uploading image', error)
		}
	}

	//data

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
		console.log(response)
		if (response.data?.response) {
			notification('success', 'Profile updated successfully')
			const newData = {
				user: { ...data.user, ...data },
				token: token,
			}
			localStorage.setItem('User', JSON.stringify(newData))
		} else {
			notification('error', 'Profile updated failed')
		}
	}
	const user = JSON.parse(localStorage.getItem('User'))
	console.log(user)
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
							disabled={!selectedImage}
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
