import { FC, PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { IRegister } from '../../interface'
import { useAppDispatch } from '../../hooks'
import { userActions } from '../../redux'
import { ButtonGroup, FormControl, Typography } from '@mui/material'
import styles from './RegisterComponent.module.scss'

export interface RegisterComponentPropsInterface extends PropsWithChildren {}

export const RegisterComponent: FC<RegisterComponentPropsInterface> = () => {
	const { register, handleSubmit, reset } = useForm()
	const dispatch = useAppDispatch()
	const onSubmit: SubmitHandler<IRegister> = (data: IRegister) => {
		dispatch(userActions.register(data))
		reset()
	}

	return (
		<Box className={styles.RegisterComponent}>
			<Typography component='p' variant='h4'>
				Sign Up
			</Typography>
			<Typography>Create an account?</Typography>
			<FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label='Username'
					variant='outlined'
					{...register('username')}
				/>
				<TextField label='Email' variant='outlined' {...register('email')} />
				<TextField
					label='Password'
					variant='outlined'
					{...register('password')}
				/>
				<TextField
					label='Re-password'
					variant='outlined'
					{...register('re_password')}
				/>
				<ButtonGroup component='div' size='large'>
					<Button variant='contained' type='submit'>
						Sign Up
					</Button>
					<Button onClick={() => reset()}>Clear</Button>
				</ButtonGroup>
			</FormControl>
		</Box>
	)
}
