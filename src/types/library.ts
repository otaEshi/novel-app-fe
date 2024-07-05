import { INovel } from "./novel";

export interface ILibraryNovelList {
    id: string;
    userId: string;
    title: string;
    isPublic: boolean;
    novels: INovel[];
}

export interface ICreateLibraryList {
    userId: string;
    title: string;
    isPublic: boolean;
}

export interface IRemoveNovelFromList {
    userId: string;
    listId: string;
    novelId: string;
}

export interface IDeleteLibraryList {
    userId: string;
    listId: string;
}

export interface IAddNovelToList {
    userId: string;
    listId: string;
    novelId: string;
}

export interface IUpdateListPrivacy {
    userId: string;
    listId: string;
    isPublic: boolean;
}

export interface IUpdateListTitle {
    userId: string;
    listId: string;
    title: string;
}