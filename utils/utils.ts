import {ICommenterCount, ILoadedComment, ILoadedStory, IUIStory, IUnsortedStory} from "./interfaces";

const MAX_commenters = 10;

const findCommenters = (comments: ILoadedComment[], commenters: ICommenterCount = {}) => {
  (comments || []).forEach(comment => {
    const { by, kids, deleted } = comment;
    if (!(!by || deleted)) {
      if (!commenters[by]) {
        commenters[by] = 0;
      }
      commenters[by] += 1;
      findCommenters(kids, commenters);
    }
  });
};

const bestCommentor = (a: [any, number], b: [any, number]) => {
  const [, countA] = a;
  const [, countB] = b;
  if (countA > countB) {
    return -1;
  } else if (countA < countB) {
    return 1;
  } else {
    return 0;
  }
};

const sortResults: ({ commenters, ...rest }: IUnsortedStory) => IUIStory = ({
  commenters,
  ...rest
}: IUnsortedStory) => {
  const entries: [string, number][] = Object.entries(commenters);
  entries.sort(bestCommentor);
  return {
    ...rest,
    commenters: entries.map(([name, count]) => ({ name, count })).filter((_, i) => i < MAX_commenters)
  };
};

export const processStories: (stories: ILoadedStory[]) => IUIStory[] = (stories: ILoadedStory[]) => {
  const results: IUnsortedStory[] = stories.map(({ kids, ...rest }) => {
    const commenters: ICommenterCount = {};
    findCommenters(kids, commenters);
    return { ...rest, commenters, loading: false };
  });
  return results.map(sortResults);
};

export const countComments = (stories: { commenters: { name: string; count: number }[] }[], name: string) => {
  return stories.reduce((m, story) => {
    story.commenters.forEach(c => {
      if (c.name === name) {
        m += c.count;
      }
    });
    return m;
  }, 0);
};

