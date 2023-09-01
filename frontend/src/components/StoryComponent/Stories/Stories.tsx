import { FC, PropsWithChildren } from 'react'

import styles from './Stories.module.scss'
import { Story } from '../Story/Story'
import { stories } from '../mockStory'
import { useAppSelector } from '../../../hooks'

export interface StoriesPropsInterface extends PropsWithChildren {}

export const Stories: FC<StoriesPropsInterface> = () => {
	const data = useAppSelector(state => state.story)
	console.log(data)
	return (
		<div className={styles.Stories}>
			{stories.map(story => (
				<Story key={story.story_id} story={story} />
			))}
		</div>
	)
}
