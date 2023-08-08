import axios from 'axios'

export const user = axios.create({
	baseURL: 'http://127.0.0.1:8000/auth',
	headers: {
		'Content-Type': 'application/json',
	},
})
