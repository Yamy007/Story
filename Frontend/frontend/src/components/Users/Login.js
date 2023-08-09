import { Button, TextField } from '@mui/material'
import React from 'react'

export const Login = () => {
	return (
		<form>
			<TextField variant='outlined' label='Password' />
			<TextField variant='outlined' label='Password' />
			<Button variant='contained'>Login</Button>
		</form>
	)
}
