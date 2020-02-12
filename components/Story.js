import { countComments } from '../utils/utils';
import React from 'react';
import { Feed, Icon, Segment } from 'semantic-ui-react';
import processedStories from '../test/stories.json';
import * as PropTypes from 'prop-types';

export const Stories = ({ stories = [], loading }) => (
  <Segment basic loading={loading}>
    <Feed size="large">
      {stories.map(story => (
        <Story key={story.id} stories={stories} story={story} />
      ))}
    </Feed>
  </Segment>
);

function Commenter({ commenter, stories }) {
  const { name, count } = commenter;
  const total = countComments(stories, name);
  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>{name}</Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="comment outline" />
            {count} comment{count > 1 ? 's' : ''}
          </Feed.Like>
          <Feed.Like>
            <Icon name="comments outline" />
            {total} comment{total > 1 ? 's' : ''} overall
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
}

Commenter.propTypes = {
  commenter: PropTypes.any,
  stories: PropTypes.any
};
const Commenters = ({ stories, commenters = [] }) => {
  return (
    <Segment basic>
      <Feed>
        {commenters.map(commenter => (
          <Commenter commenter={commenter} stories={stories} />
        ))}
      </Feed>
    </Segment>
  );
};

export const Story = ({ stories, story }) => {
  return (
    <Feed.Event
      icon="calendar"
      date={story.loading ? `Loading ${story.id}` : undefined}
      summary={story.title}
      extraText={<Commenters stories={stories} commenters={story.commenters} />}
    />
    /*
        <div>
            <pre style={{border: '1px solid #ccc;'}}>{story.title}</pre>
            <blockquote>
                {story.commenters.map(({name, count}) => <pre>{name}: {count} - {countComments(stories, name)}</pre>)}
            </blockquote>
            <hr/>
        </div>*/
  );
};
