import { Button } from '@mui/material'
import React from 'react'
import { user } from '../api/user'
export const Logout = () => {
	const Logout = () => {
		user.post('logout').then(value => console.log(value))
	}
	return <Button onClick={Logout}>Logout</Button>
}
