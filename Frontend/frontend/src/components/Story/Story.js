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
import { Button } from '@mui/material'
export const Story = ({ story }) => {
	return (
		<>
			{story?.map(elem => (
				<Card sx={{ maxWidth: 345 }}>
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
					<CardMedia
						component='img'
						height='194'
						image='https://source.unsplash.com/random'
						alt='Paella dish'
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
					<CardActions disableSpacing>
						<IconButton aria-label='add to favorites'>
							<FavoriteIcon />
						</IconButton>
						<Typography variant='body2' component='p'>
							Likes: {elem.likes}
						</Typography>
						<IconButton aria-label='share'>
							<ShareIcon />
						</IconButton>
					</CardActions>
				</Card>
			))}
		</>
	)
}
