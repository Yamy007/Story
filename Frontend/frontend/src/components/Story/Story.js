import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import clipboardCopy from 'clipboard-copy'
import { Color } from '../ColorGenre/Color'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationDisplay } from '../Notification/Notification'
import { storyActions } from '../../redux/slice/StorySlice'
export const Story = () => {
	// const data = Color()
	const theme = useSelector(state => state.theme.theme)
	const dispatch = useDispatch()
	const handleCopyToClipboard = id => {
		const textToCopy = window.location.href + '/' + id
		clipboardCopy(textToCopy)
			.then(() => {
				NotificationDisplay.showNotification('success', 'success text copied')
			})
			.catch(error => {
				NotificationDisplay.showNotification('error', 'upc....')
			})
	}
	// React.useEffect(() => {}, [dispatch])
	const page = useSelector(state => state.story.page.current)
	const story = useSelector(state => state.story.data)
	const allGenre = useSelector(state => state.genre.genre)
	console.log(story)
	return (
		<>
			<NotificationDisplay />
			{story?.map((elem, index) => (
				<Card
					key={index}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						minHeight: '38vh',
						cursor: 'pointer',
					}}
					className='card'
				>
					<Box>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
									R
								</Avatar>
							}
							action={
								<IconButton
									aria-label='settings'
									sx={
										theme === 'dark'
											? { color: '#B8B8B8' }
											: { color: '#363434' }
									}
								>
									<MoreVertIcon />
								</IconButton>
							}
							title={
								<span
									sx={
										theme === 'dark' ? { color: '#EBEBEB' } : { color: 'green' }
									}
								>
									{elem.title}
								</span>
							}
							subheader={
								<span
									sx={
										theme === 'dark' ? { color: '#B3B3B3' } : { color: 'green' }
									}
								>
									{elem.date}
								</span>
							}
						/>

						<CardContent>
							<Typography
								variant='body2'
								color={theme === 'dark' ? '#EFEAEA' : 'green'}
							>
								{elem.story_body}
							</Typography>
							<Typography variant='h5'>
								{elem.genres?.map((elem, index) => (
									<Button variant='contained' key={index}>
										{allGenre?.filter(x => x.id === elem)[0]?.genre}
									</Button>
								))}
							</Typography>
						</CardContent>
					</Box>
					<CardActions disableSpacing>
						<IconButton
							sx={
								theme === 'dark' ? { color: '#B8B8B8' } : { color: '#363434' }
							}
							aria-label='add to favorites'
							onClick={() =>
								dispatch(storyActions.addLike({ id: elem.story_id, page }))
							}
						>
							<FavoriteIcon />
						</IconButton>
						<Typography
							variant='body2'
							component='p'
							sx={
								theme === 'dark' ? { color: '#B8B8B8' } : { color: '#363434' }
							}
						>
							Likes: {elem.likes}
						</Typography>
						<IconButton
							onClick={() => handleCopyToClipboard(elem.story_id)}
							aria-label='share'
							sx={
								theme === 'dark' ? { color: '#B8B8B8' } : { color: '#363434' }
							}
						>
							<ShareIcon />
						</IconButton>
						<Link to={`/story/${elem.story_id}`}>
							<Button
								variant='outlined'
								color='info'
								sx={{ margin: '2vw', width: '5vw' }}
							>
								Read
							</Button>
						</Link>
					</CardActions>
				</Card>
			))}
		</>
	)
}
