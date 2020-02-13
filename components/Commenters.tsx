import { countComments } from '../utils/utils';
import React from 'react';
import { Feed, Icon, Segment } from 'semantic-ui-react';
import { ICommenter, IUIStory } from '../utils/interfaces';

type CommenterProps = {
  commenter: ICommenter;
  stories: IUIStory[];
};
const Commenter: React.FC<CommenterProps> = ({ commenter, stories }) => {
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
};

type CommentersProps = {
  commenters: ICommenter[];
  stories: IUIStory[];
};
export const Commenters: React.FC<CommentersProps> = ({ stories, commenters = [] }) => {
  return (
    <Segment basic>
      <Feed>
        {commenters.map(commenter => (
          <Commenter key={commenter.name} commenter={commenter} stories={stories} />
        ))}
      </Feed>
    </Segment>
  );
};
