import React, { useState, useEffect } from 'react'
import { api } from '../api/api'

function getRandomBrightColor(isDark) {
	// Генеруємо три випадкових числа в діапазоні від 0 до 255 для R, G та B компонентів
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	if (isDark) {
		if (r + g + b > 300) {
			return getRandomBrightColor(isDark)
		}
	} else {
		if (r + g + b < 300) {
			return getRandomBrightColor(isDark)
		}
	}

	return `#${r.toString(16).padStart(2, '0')}${g
		.toString(16)
		.padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export const Color = isDark => {
	const [genre, setGenre] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('get_all_genres')
				setGenre(
					response.data.map(genre => ({
						...genre,
						color: getRandomBrightColor(isDark),
					}))
				)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [isDark])
	return genre
}
