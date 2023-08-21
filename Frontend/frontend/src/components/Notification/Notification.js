import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'

export const NotificationDisplay = () => {
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null)
			}, 3000)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [notification])

	const showNotification = (type, message) => {
		setNotification({ type, message })
	}
	NotificationDisplay.showNotification = showNotification

	return (
		<>
			{notification && (
				<Alert
					severity={notification.type}
					sx={{
						position: 'absolute',
						top: '25vh',
						right: '0vh',
						width: '20%',
						opacity: '1',
						borderRadius: '10px 0 0 10px',
					}}
				>
					{notification.message}
				</Alert>
			)}
		</>
	)
}
