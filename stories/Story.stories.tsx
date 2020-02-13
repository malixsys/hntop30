import React from 'react';
import { processStories } from '../utils/utils';
import smallStories from '../test/small.json';
import bigStories from '../test/top.json';
import {Stories} from "../components/Stories";

export default {
  title: 'Stories',
  component: Stories
};

export const SmallStories = () => <Stories stories={processStories(smallStories)} />;

SmallStories.story = {
  name: 'Small Stories'
};

export const BigStories = () => <Stories stories={processStories(bigStories)} />;

BigStories.story = {
  name: 'Big Stories'
};
