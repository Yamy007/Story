import { Button } from '@mui/material'
import React from 'react'
import { UserAuth } from '../api/user'
export const Logout = ({ onSave }) => {
	return (
		<Button
			onClick={() => {
				onSave(prev => !prev)
				return UserAuth().logout()
			}}
		>
			Logout
		</Button>
	)
}
