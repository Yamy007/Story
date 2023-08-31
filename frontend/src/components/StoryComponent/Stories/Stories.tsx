import { FC, PropsWithChildren } from "react";

import styles from "./Stories.module.scss";
import { Story } from "../Story/Story";
import { stories } from "../mockStory";

export interface StoriesPropsInterface extends PropsWithChildren {}

export const Stories: FC<StoriesPropsInterface> = () => {
  return (
    <div className={styles.Stories}>
      {stories.map((story) => (
        <Story key={story.story_id} story={story} />
      ))}
    </div>
  );
};
