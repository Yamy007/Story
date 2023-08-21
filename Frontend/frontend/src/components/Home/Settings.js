import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { UserActions } from '../../redux/slice/UserSlice'
import { baseURL } from '../../constants/urls'
import { deepEqual } from '../../Function/deepEqual'
import { NotificationDisplay } from '../Notification/Notification'
export const Settings = () => {
	//redux
	const dispatch = useDispatch()

	//image
	const [selectedImage, setSelectedImage] = useState(null)

	const avatar = baseURL + useSelector(state => state.user.user.image)
	const [image, setImage] = useState(avatar)

	const handleUpload = async () => {
		const formData = new FormData()
		formData.append('image', selectedImage)
		try {
			const response = await dispatch(UserActions.updateImage(formData))
			setSelectedImage(null)

			if (response.payload.response) {
				NotificationDisplay.showNotification(
					'success',
					response.payload.message
				)
			} else {
				NotificationDisplay.showNotification('error', response.payload.message)

				setImage(prev => console.log(avatar))
			}
		} catch (error) {
			NotificationDisplay.showNotification('error', error)
		}
	}

	//data

	const { first_name, last_name, email, bio, phone, address } = useSelector(
		state => state.user.user
	)
	const [defaultValues, setDefaultValues] = useState({
		first_name: first_name,
		last_name: last_name,
		email: email,
		bio: bio,
		phone: phone,
		address: address,
	})
	const [change, setChange] = useState(defaultValues)
	const { register, handleSubmit } = useForm({
		defaultValues,
	})

	const onSubmit = async data => {
		const response = await dispatch(UserActions.updateProfile(data))
		if (response.payload.response) {
			setDefaultValues(change)
			NotificationDisplay.showNotification('success', response.payload.message)
		} else {
			NotificationDisplay.showNotification('error', response.payload.message)
		}
	}

	return (
		<Container maxWidth='md' sx={{ paddingTop: '10vh' }}>
			<Grid container spacing={3} alignItems='center'>
				<NotificationDisplay />

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
							<input
								type='file'
								accept='.png, .jpg, .jpeg, .gif'
								hidden
								onChange={event => {
									setSelectedImage(event.target.files[0])
									setImage(URL.createObjectURL(event.target.files[0]))
								}}
							/>
						</Button>
						<Button
							variant='contained'
							component='label'
							disabled={!selectedImage}
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
							onChange={e =>
								setChange({ ...change, first_name: e.target.value })
							}
						/>
						<TextField
							fullWidth
							label='Last Name'
							name='surname'
							margin='normal'
							{...register('last_name')}
							onChange={e =>
								setChange({ ...change, last_name: e.target.value })
							}
						/>
						<TextField
							fullWidth
							label='Email'
							name='email'
							margin='normal'
							disabled
							{...register('email')}
							onChange={e => setChange({ ...change, email: e.target.value })}
						/>
						<TextField
							fullWidth
							label='Bio'
							name='bio'
							multiline
							rows={4}
							margin='normal'
							{...register('bio')}
							onChange={e => setChange({ ...change, bio: e.target.value })}
						/>
						<TextField
							fullWidth
							label='Phone'
							name='phone'
							margin='normal'
							{...register('phone')}
							onChange={e => setChange({ ...change, phone: e.target.value })}
						/>
						<TextField
							fullWidth
							label='Address'
							name='address'
							multiline
							rows={2}
							margin='normal'
							{...register('address')}
							onChange={e => setChange({ ...change, address: e.target.value })}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={deepEqual(change, defaultValues)}
						>
							Save Changes
						</Button>
					</Grid>
				</form>
			</Grid>
		</Container>
	)
}
