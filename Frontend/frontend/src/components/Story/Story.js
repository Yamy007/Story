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

export const Story = ({ story }) => {
	const handleCopyToClipboard = id => {
		const textToCopy = window.location.href + '/' + id
		clipboardCopy(textToCopy)
			.then(() => {
				alert('Success!')
			})
			.catch(error => {
				console.error('Помилка копіювання у буфер обміну:', error)
			})
	}

	return (
		<>
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
								<IconButton aria-label='settings'>
									<MoreVertIcon />
								</IconButton>
							}
							title={elem.title}
							subheader={elem.date}
						/>

						<CardContent>
							<Typography variant='body2' color='text.secondary'>
								{elem.story_body}
							</Typography>
							<Typography variant='h5' color='text.secondary'>
								{elem.genres?.map((elem, index) => (
									<Button variant='text' color='error' key={index}>
										{elem}
									</Button>
								))}
							</Typography>
						</CardContent>
					</Box>
					<CardActions disableSpacing>
						<IconButton
							aria-label='add to favorites'
							onClick={() => console.log('click')}
						>
							<FavoriteIcon />
						</IconButton>
						<Typography variant='body2' component='p'>
							Likes: {elem.likes}
						</Typography>
						<IconButton aria-label='share'>
							<ShareIcon onClick={() => handleCopyToClipboard(elem.story_id)} />
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
