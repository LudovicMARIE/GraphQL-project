export interface UserInterface {
    id: string;
    email: string;
    username: string;
    bio: string;
}

export interface ArticleData {
    getArticleById: {
      author: UserInterface;
      authorId: string;
      comment: CommentInterface[];
      content: string;
      id: string;
      like: LikeInterface[];
      published: boolean;
      title: string;
    }
  }


export interface ArticleInterface {
      author: UserInterface;
      authorId: string;
      comment: CommentInterface[];
      content: string;
      id: string;
      like: LikeInterface[];
      published: boolean;
      title: string;
  }
  
  export interface CommentInterface {
    articleId: string;
    author: UserInterface;
    authorId: string;
    content: string;
    createdAt: string;
    id: string;
    updatedAt: string;
  }
  
  export interface LikeInterface {
    user: UserInterface
    id: string;
    createdAt: string;
    articleId: string;
    userId: string;
  }

