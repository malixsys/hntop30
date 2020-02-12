import React from 'react';
import {userHackerNews} from '../components/userHackerNews';
import {Stories, Story} from '../components/Story';
import {App} from "../components/App";

export default () => {
  const { stories, loading } = userHackerNews();
  return (
    <App>
      <Stories stories={stories} loading={loading} />
    </App>
  );
};
