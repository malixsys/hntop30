const MAX_commenters = 10;

const findcommenters = (comments, commenters = {}) => {
  (comments || []).forEach(comment => {
    const { by, kids, deleted } = comment;
    if (!(!by || deleted)) {
      if (!commenters[by]) {
        commenters[by] = 0;
      }
      commenters[by] += 1;
      findcommenters(kids, commenters);
    }
  });
};

const bestCommentor = (a, b) => {
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

const sortResults = ({ commenters, ...rest }) => {
  const entries = Object.entries(commenters);
  entries.sort(bestCommentor);
  return {
    ...rest,
    commenters: entries.map(([name, count]) => ({ name, count })).filter((_, i) => i < MAX_commenters)
  };
};

export const processStories = stories => {
  const results = stories.map(({ kids, ...rest }) => {
    const commenters = {};
    findcommenters(kids, commenters);
    return { ...rest, commenters };
  });
  return results.map(sortResults);
};

export const countComments = (stories, name) => {
  return stories.reduce((m, story) => {
    story.commenters.forEach(c => {
      if (c.name === name) {
        m += c.count;
      }
    });
    return m;
  }, 0);
};
