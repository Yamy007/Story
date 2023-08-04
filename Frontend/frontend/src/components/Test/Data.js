import React, { useEffect, useState } from 'react'

export const Data = () => {
	const [data, setData] = useState(null)
	useEffect(() => {
		fetch('http://127.0.0.1:8000/test_api/')
			.then(value => value.json())
			.then(value => setData(value))
	}, [])

	console.log(data)
	return <div>Data</div>
}
