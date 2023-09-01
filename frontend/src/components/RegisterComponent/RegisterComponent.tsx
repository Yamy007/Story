import { FC, PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Paper, TextField } from '@mui/material'
import { IUser } from '../../interface'
import { useAppDispatch } from '../../hooks'
import { userActions } from '../../redux'

export interface RegisterComponentPropsInterface extends PropsWithChildren {}

export const RegisterComponent: FC<RegisterComponentPropsInterface> = () => {
	const { register, handleSubmit, reset } = useForm()
	const dispatch = useAppDispatch()
	const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
		dispatch(userActions.register(data))
		reset()
	}

	return (
		<Paper>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<Button variant='contained' type='submit'>
					Sing UP
				</Button>
			</form>
		</Paper>
	)
}
