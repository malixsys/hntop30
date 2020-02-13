import React from 'react';
import { Feed } from 'semantic-ui-react';
import { Commenters } from './Commenters';
import { IUIStory } from '../utils/interfaces';

type StoryProps = {
  stories: IUIStory[];
  story: IUIStory;
};

export const Story: React.FC<StoryProps> = ({ stories, story }) => {
  return (
    <Feed.Event
      as="a"
      target="_blank"
      href={story.url}
      icon="calendar"
      date={story.loading ? `Loading ${story.id}...` : undefined}
      summary={story.title}
      extraText={<Commenters stories={stories} commenters={story.commenters} />}
    />
  );
};
