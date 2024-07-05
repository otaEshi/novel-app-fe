import { IComment } from "./novel";

export interface IReadPage {
    content: string;
    title: string;
    totalChapter: string;
    theme: string;
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    comments: IComment[]; 
}