export type AuthorModel = {
    id: string;
    email: string;
    username: string;
    bio: string;
}

export type ArticleModel = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: string[];
}