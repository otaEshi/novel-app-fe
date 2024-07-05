export interface ISearchNovel {
    title?: string;
    author?: string;
    chapters?: number;
    chaptersOption?: string;
    rating?: number;
    ratingOption?: string;
    reviews?: number;
    reviewsOption?: string;
    view?: number;
    viewOption?: string;
    genreInclude?: string[];
    genreExclude?: string[];
    tagsInclude?: string[];
    tagsExclude?: string[];
    sortBy: string;
    isAscending: boolean;
}