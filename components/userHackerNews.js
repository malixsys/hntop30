import React from 'react';
import { readStory } from '../utils/firebase';
import { processStories } from '../utils/utils';
const NUMBER_OF_STORIES = 30;

export function userHackerNews() {
  const [state, setState] = React.useState({ stories: [], loading: false });
  const [firebase, setFirebase] = React.useState();
  React.useEffect(() => {
    const temp = story => {
      setState(({ stories, loading }) => ({
        loading,
        stories: stories.map(o => (o.id === story.id ? { ...story, loading: true } : o))
      }));
      return story;
    };
    const handle = snapshot => {
      const val = snapshot.val().slice(0, NUMBER_OF_STORIES);
      setState(({ stories, loading }) => ({
        loading,
        stories: val.map(id => ({ loading: true, id }))
      }));
      const reads = val.map(id => {
        return readStory(firebase, id).then(temp);
      });
      Promise.all(reads)
        .then(processStories)
        .then(stories => {
          setState(() => ({
            loading: false,
            stories
          }))
        }).catch(error => console.error(error));
    };
    if (firebase) {
      setState(({ stories }) => ({ stories, loading: true }));
      const top = firebase.child('topstories');
      top.once('value', handle);
    }
  }, [firebase, setState]);
  React.useEffect(() => {
    const ref = new Firebase('https://hacker-news.firebaseio.com/v0/');
    setFirebase(ref);
  }, [setFirebase]);
  return state;
}
