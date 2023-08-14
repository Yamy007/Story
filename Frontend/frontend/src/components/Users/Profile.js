import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { UserAuth } from '../api/user'
import axios from 'axios'

export const Profile = () => {
	const [profile, setProfile] = useState([])
	useEffect(() => {
		const fetchProfile = async () => {
			const response = await UserAuth().profile()
			setProfile(response?.data)
		}
		fetchProfile()
	}, [])
	console.log(profile)
	return <Box> </Box>
}
