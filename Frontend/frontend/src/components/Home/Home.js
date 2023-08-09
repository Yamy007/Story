import React, {useState} from 'react';


export const Home = ({ isDark, setIsDark }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const API_HOST = 'http://127.0.0.1:8000';

	let _csrfToken = null;

	async function getCsrfToken() {
	if (_csrfToken === null) {
		const response = await fetch(`${API_HOST}/auth/csrf_cookie`, {
		credentials: 'include',
		});
		const data = await response.json();
		_csrfToken = data.csrfToken;
	}
	return _csrfToken;
	}
  
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	  };

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleSubmit = async (username, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
					'X-CSRFToken': await getCsrfToken()},
			body: JSON.stringify({
				"username":username,
				"password":password
			})
		};
		const response = await fetch(`${API_HOST}/auth/login`, requestOptions);
		const data = await response.json();
		console.log(data)

	};
	return (
		<form onSubmit={handleSubmit}>
			<label>
			Username:
			<input type="text" value={username} onChange={handleUsernameChange} />
			</label>
			<label>
			Password:
			<input type="password" value={password} onChange={handlePasswordChange} />
			</label>
			<button type="submit">Submit</button>
		</form>
	)
}
