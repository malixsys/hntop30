import React from 'react';
import { Feed, Segment } from 'semantic-ui-react';
import { Story } from './Story';
import { IUIStory } from '../utils/interfaces';

type StoriesProps = {
  stories: IUIStory[];
  loading?: boolean;
};

export const Stories: React.FC<StoriesProps> = ({ stories = [], loading = false }) => (
  <Segment basic loading={loading}>
    <Feed size="large">
      {stories.map(story => (
        <Story key={story.id} stories={stories} story={story} />
      ))}
    </Feed>
  </Segment>
);
