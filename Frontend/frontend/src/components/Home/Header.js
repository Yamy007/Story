import { useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { avatar } from '../../constants/image.urls'
import { page, setings_login, setings_logout } from '../../constants/heder'
import { navigateHeader } from '../Navigate/Navigate'

export const Header = ({ isDark, setIsDark, save, onSave }) => {
	let redirect = useNavigate()

	//user_info
	let isAutofication = useSelector(state => state.user.isAutofication)
	const photoProfile = useSelector(state => state.user.user.image) || avatar
	const username = useSelector(state => state.user.user.username)

	//settings
	const pages = page
	const settings = isAutofication ? setings_login : setings_logout

	//set_window_mui
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)

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
							onClick={event => setAnchorElNav(event.currentTarget)}
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
							onClose={() => setAnchorElNav(null)}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={() => setAnchorElNav(null)}>
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
									onClick={() => setAnchorElNav(null)}
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
					{isAutofication ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton
									onClick={event => setAnchorElUser(event.currentTarget)}
									sx={{ p: 0 }}
								>
									<Avatar
										sx={{ width: '55px', height: '55px' }}
										alt={username}
										src={photoProfile}
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
								onClose={() => setAnchorElUser(null)}
							>
								{settings.map(setting => (
									<MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
										<Button
											color='warning'
											onClick={() => navigateHeader(setting, redirect)}
										>
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
									onClick={() => navigateHeader(setting, redirect)}
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
