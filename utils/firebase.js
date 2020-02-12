/**
 * Recursively load an array of kids by id
 * @param {object} firebase
 * @param {number[]} kids
 * @returns {Promise} an array of kids
 */
const loadKids = async (firebase, kids) => {
  const reads = (kids || []).map(
    async id =>
      new Promise(async resolve => {
        const item = await getItem(firebase, id);
        if(!item) {
            return {}
        }
        const kids = item.kids && item.kids.length > 0 ? await loadKids(firebase, item.kids) : [];
        resolve({ ...item, kids });
      })
  );
  return Promise.all(reads);
};

/**
 * Get an item from Firebase by id
 * @param {object} firebase
 * @param {number} id
 * @returns {Promise<{object}>}
 */
const getItem = (firebase, id) =>
  new Promise(async resolve => {
    if (!id) {
      return resolve({});
    }
    const itemRef = firebase.child('item').child(id);
    itemRef.once('value', async itemSnapshot => {
      const value = itemSnapshot.val();
      resolve(value);
    });
  });

/**
 * read a story from Firebase by id
 * @param {object} firebase
 * @param {number} id
 * @returns {Promise<{object}>}
 */
export const readStory = (firebase, id) =>
  new Promise(async resolve => {
    const story = await getItem(firebase, id);
    const kids = story.kids && story.kids.length > 0 ? await loadKids(firebase, story.kids) : [];
    resolve({ ...story, kids });
  });
