import React from 'react';
import { readStory } from '../utils/firebase';
import { processStories } from '../utils/utils';
import {ICommenter, IFirebase, ILoadedStory, IUIStory} from "../utils/interfaces";

const NUMBER_OF_STORIES = 30;

interface IState {
  stories: IUIStory[];
  loading: boolean;
}

export function userHackerNews() {
         const [state, setState]: [IState, React.Dispatch<React.SetStateAction<IState>>] = React.useState<IState>({
           stories: [],
           loading: false
         });
         const [firebase, setFirebase] = React.useState();
         React.useEffect(() => {
           const onTopStoriesLoaded = (snapshot: IFirebase) => {
             const storyIds: number[] = snapshot.val().slice(0, NUMBER_OF_STORIES);

             // show initial loading numbers
             setState(({ loading }) => ({
               loading,
               stories: storyIds.map((id: number) => ({ loading: true, id } as IUIStory))
             }));

             // get promises of retrieving all the stories
             const reads: Promise<ILoadedStory>[] = storyIds.map(async (id: number) => {
               const story = await readStory(firebase, id);
               // show the story title before it's processed
               setState(({ stories, loading }) => ({
                 loading,
                 stories: stories.map(o =>
                   o.id === story.id
                     ? ({ title: story.title, id: story.id, loading: true, commenters: [] as ICommenter[] } as IUIStory)
                     : o
                 )
               }));
               return story;
             });

             // when we have all the stories, process the comment counts
             Promise.all(reads)
               .then(processStories)
               .then(stories => {
                 setState(() => ({
                   loading: false,
                   stories
                 }));
               })
               .catch(error => console.error(error));
           };
           // once firebase is loaded, get the top stories
           if (firebase) {
             setState(({ stories }) => ({ stories, loading: true }));
             const top = firebase.child('topstories');

             // TODO handle `.on()` prgressive updates
             top.once('value', onTopStoriesLoaded);
           }
         }, [firebase, setState]);
         React.useEffect(() => {
           // load firebase on initial render
           const win = window as any;
           const ref = new win.Firebase('https://hacker-news.firebaseio.com/v0/');
           setFirebase(ref);
         }, [setFirebase]);
         return state;
       }
