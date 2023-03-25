// data-action
export type BooksList = {
  id: string;
  etag: string;
  title: string;
  authors?: string[];
  publishedDate: string;
  categories: string[];
  imageLink: string;
};

export type Book = {
  id: string;
  etag: string;
  title: string;
  authors: string[];
  categories: string[];
  imageLink: string;
  description: string;
};

export type MoreBooksURLData = [number, ...string[]];

export type DataSliceState = {
  booksList: BooksList[];
  totalItems: number | null;
  status: string;
  book: Book | null;
  moreBooks: string[];
  moreBooksURLData: MoreBooksURLData;
};

// data-slice
export type Item = {
  id: string;
  etag: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate: string;
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
};

export type SearchBooksResponse = {
  kind: string;
  totalItems: number;
  items: Item[];
};

export type FetchDataResponse = [BooksList[], number];
