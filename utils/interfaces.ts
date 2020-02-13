export interface IUnsortedStory {
    id: number;
    title: string;
    loading: boolean;
    commenters: ICommenterCount;
}

export interface IReference {
    once(
        eventType: string,
        successCallback?: (a: IFirebase, b?: string) => any,
        failureCallbackOrContext?: Object | null,
        context?: Object | null
    ): Promise<any>;
}

export interface IFirebase extends IReference {
    child(path: string): IFirebase;

    exists(): boolean;

    exportVal(): any;

    forEach(action: (a: IFirebase) => boolean): boolean;

    getPriority(): string | number | null;

    hasChild(path: string): boolean;

    hasChildren(): boolean;

    key: string | null;

    numChildren(): number;

    ref: IReference;

    toJSON(): Object | null;

    val(): any;
}

export interface IGetItem {
    firebase: IFirebase;
    id: number;
}

export interface IFirebaseStory {
    title: string;
    id: number;
    kids: number[];
}

export interface ILoadedStory {
    title: string;
    id: number;
    kids: ILoadedComment[];
}

export interface ICommenter {
    name: string;
    count: number;
}

export interface IUIStory {
    title: string;
    url?: string;
    id?: number;
    commenters: ICommenter[];
    loading: boolean;
}

export interface ICommenterCount {
    [index: string]: number;
}

export interface IFirebaseComment {
    by?: string;
    kids: number[];
    deleted?: boolean;
}

export interface ILoadedComment {
    by?: string;
    kids: ILoadedComment[];
    deleted?: boolean;
}
