import { FC, PropsWithChildren } from 'react'
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	TextField,
	Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './LoginComponent.module.scss'
import { ILogin } from '../../interface'
import { userService } from '../../services'
import { useAppDispatch } from '../../hooks'
import { userActions } from '../../redux'
export interface LoginComponentPropsInterface extends PropsWithChildren {}

interface FormInputInterface {
	login: string
	password: string
}

export const LoginComponent: FC<LoginComponentPropsInterface> = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormInputInterface>()
	const dispatch = useAppDispatch()
	const userLogin: SubmitHandler<ILogin> = (data: ILogin) => {
		dispatch(userActions.login(data))
		reset()
	}

	return (
		<Box className={styles.LoginComponent}>
			<Typography component='p' variant='h4'>
				Sing In
			</Typography>
			<Typography className={styles.textText}>Create an account?</Typography>
			<FormControl component='form' onSubmit={handleSubmit(userLogin)}>
				<TextField
					label='Username'
					variant='outlined'
					{...register('login', { required: true })}
				/>
				{errors.login && <Typography>{errors.login.message}</Typography>}
				<TextField
					label='Password'
					variant='outlined'
					{...register('password', { required: true })}
				/>
				{errors.password && <Typography>{errors.password.message}</Typography>}
				<ButtonGroup component='div' size='large'>
					<Button variant='contained' type='submit' disabled={!isValid}>
						Sign In
					</Button>
					<Button onClick={() => reset()}>Clear</Button>
				</ButtonGroup>
			</FormControl>
		</Box>
	)
}
