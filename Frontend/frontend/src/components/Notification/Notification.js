import { Alert } from '@mui/material'
import React from 'react'

export const Notification = ({ type, message }) => {
	return (
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
	)
}
