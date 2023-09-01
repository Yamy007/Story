import { FC, PropsWithChildren, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Paper, TextField } from '@mui/material'
import { IUser } from '../../interface'
import { userService } from '../../services'

export interface RegisterComponentPropsInterface extends PropsWithChildren {}

export const RegisterComponent: FC<RegisterComponentPropsInterface> = () => {
	const { register, handleSubmit, reset } = useForm()
	const onSubmit: SubmitHandler<IUser> = (data: IUser) => {}
	useEffect(() => {
		userService.cookie()
		const allCookies: string = document.cookie
		console.log(
			allCookies.split(';')?.filter(elem => elem.includes('csrftoken='))
		)
	}, [])
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
				<Button variant='contained'>Sing UP</Button>
			</form>
		</Paper>
	)
}
