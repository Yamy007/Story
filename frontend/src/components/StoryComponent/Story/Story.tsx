import { FC, PropsWithChildren } from "react";
import { CardContent, CardHeader, Card } from "@mui/material";

import { IStory } from "../../../interface";

export interface StoryPropsInterface extends PropsWithChildren {
  story: IStory;
}

export const Story: FC<StoryPropsInterface> = ({ story }) => {
  const { title, story_body, date, likes } = story;

  const dateTransform = (date: string) => new Date(date).toLocaleDateString();

  return (
    <Card>
      <CardHeader title={title} subheader={dateTransform(date)} />
      <CardContent>{story_body}</CardContent>
      <CardContent>Likes: {likes}</CardContent>
    </Card>
  );
};
