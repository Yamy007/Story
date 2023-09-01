import { FC, PropsWithChildren } from 'react'
import {
	CardContent,
	CardHeader,
	Card,
	Button,
	IconButton,
} from '@mui/material'
import { IStory } from '../../../interface'
import FavoriteIcon from '@mui/icons-material/Favorite'

export interface StoryPropsInterface extends PropsWithChildren {
	story: IStory
}

export const Story: FC<StoryPropsInterface> = ({ story }) => {
	const { title, story_body, date, likes } = story

	const dateTransform = (date: string) => new Date(date).toLocaleDateString()

	return (
		<Card>
			<CardHeader title={title} subheader={dateTransform(date)} />
			<CardContent>{story_body}</CardContent>
			<CardContent>
				<IconButton aria-label='likes'>
					<FavoriteIcon />
				</IconButton>
				{likes}
			</CardContent>
		</Card>
	)
}
