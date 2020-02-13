import React from 'react';
import { userHackerNews } from '../components/userHackerNews';
import { App } from '../components/App';
import { Stories } from '../components/Stories';

export default () => {
  const { stories, loading } = userHackerNews();
  return (
    <App>
      <Stories stories={stories} loading={loading} />
    </App>
  );
};
