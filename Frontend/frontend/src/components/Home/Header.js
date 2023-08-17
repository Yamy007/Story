import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { FormControlLabel, Switch } from '@mui/material'
import { Link } from 'react-router-dom'
import { Logout } from '../Users/Logout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Header = ({ isDark, setIsDark, save, onSave }) => {
	//const [isAuth, setIsAuth] = useState(false)
	let redirect = useNavigate()

	const isAuth = useSelector(state => state.users.isAuthenticated)
	const avatar =
		useSelector(state => state.users.user.image) ||
		'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
	const username = useSelector(state => state.users.user.username)
	console.log(username)

	const pages = ['Home', 'Story', 'Blog']
	const settings = isAuth ? ['Settings', 'Logout'] : ['Register', 'Login']

	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const Action = type => {
		if (type === 'Logout') {
			onSave(prev => !prev)
			Logout()
		}
		if (type === 'Register') {
			return redirect('/user/register')
		}
		if (type === 'Login') {
			console.log('login')
			return redirect('/user/login')
		}
	}

	return (
		<AppBar
			position='fixed'
			sx={{
				height: '8vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Yamy
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Yamy
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Link
								key={page}
								to={page === 'Home' ? '/' : page}
								style={{ textDecoration: 'none' }}
							>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							</Link>
						))}
					</Box>
					<FormControlLabel
						control={
							<Switch
								color='secondary'
								checked={isDark}
								onChange={() => setIsDark(prev => !prev)}
							/>
						}
						label={isDark ? 'Dark' : 'Light'}
					/>
					{isAuth ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										sx={{ width: '55px', height: '55px' }}
										alt={username}
										src={avatar ? avatar : 'http://localhost:3000/avatar2.png'}
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map(setting => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Button color='warning' onClick={() => Action(setting)}>
											{setting}
										</Button>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : (
						<Box sx={{ flexGrow: 0 }}>
							{settings.map((setting, idx) => (
								<Button
									color='warning'
									variant='outlined'
									sx={{ margin: '5px' }}
									key={idx}
									onClick={() => Action(setting)}
								>
									{setting}
								</Button>
							))}
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}
