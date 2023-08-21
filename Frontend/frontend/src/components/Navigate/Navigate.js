export const navigateHeader = (action, redirect) => {
	if (action === 'Logout') {
		return redirect('/user/logout')
	}
	if (action === 'Register') {
		return redirect('/user/register')
	}
	if (action === 'Login') {
		return redirect('/user/login')
	}
	if (action === 'Settings') {
		return redirect('/user/settings')
	}
}
