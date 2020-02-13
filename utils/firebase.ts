import {IFirebase, IFirebaseComment, IFirebaseStory, IGetItem, ILoadedComment, ILoadedStory} from "./interfaces";

/**
 * Recursively load an array of kids by id
 * @param {object} firebase
 * @param {number[]} kids
 * @returns {Promise} an array of kids
 */
const loadKids: (firebase: IFirebase, kids: number[]) => Promise<ILoadedComment[]> = async (
  firebase: IFirebase,
  kids: number[]
) => {
  const reads: Promise<ILoadedComment>[] = (kids || []).map(
    async id =>
      new Promise<ILoadedComment>(async resolve => {
        const item: IFirebaseComment = <IFirebaseComment>await getItem({ firebase: firebase, id: id });
        if (!item) {
          return {};
        }
        const kids = item.kids && item.kids.length > 0 ? await loadKids(firebase, item.kids as number[]) : [];
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
const getItem: ({ firebase, id }: IGetItem) => Promise<IFirebaseStory | IFirebaseComment> = ({ firebase, id }: IGetItem) =>
  new Promise(async resolve => {
    if (!id) {
      return resolve({} as IFirebaseComment);
    }
    const itemRef = firebase.child('item').child(String(id));
    return itemRef.once('value', async (itemSnapshot: IFirebase) => {
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
export const readStory: (firebase: IFirebase, id: number) => Promise<ILoadedStory> = (firebase: IFirebase, id: number) =>
  new Promise(async resolve => {
    const story: IFirebaseStory = <IFirebaseStory>await getItem({ firebase: firebase, id: id });
    const kids = story.kids && story.kids.length > 0 ? await loadKids(firebase, story.kids) : [];
    resolve({ ...story, kids });
  });
