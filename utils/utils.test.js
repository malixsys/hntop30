import stories from '../test/top.json';
import smallStories from '../test/small.json';
import processedStories from '../test/stories.json';
import { processStories, countComments } from './utils';

describe('countComments', () => {
  it('returns proper values', () => {
    expect(countComments(processedStories, 'user-a')).toEqual(9);
    expect(countComments(processedStories, 'user-b')).toEqual(10);
    expect(countComments(processedStories, 'user-c')).toEqual(8);
  });
});

describe('processStories', () => {
  it('returns proper values for small result', () => {
    const result = processStories(smallStories);
    expect(result).toEqual(processedStories);
  });
  it('returns proper values for big result', () => {
    const result = processStories(stories);
    expect(result).toMatchSnapshot();
  });
});
