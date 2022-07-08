import { dataActions } from "./data-action";

export const fetchingData = (searchInput,orderBy,categoryBy) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchData = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}${categoryBy}&orderBy=${orderBy}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=30&startIndex=0`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            const mappedArray =  data.items.map((item)=>{
                const newObj = {
                    id: item?.id,
                    etag: item?.etag,
                    title: item?.volumeInfo?.title,
                    authors: item?.volumeInfo?.authors,
                    piblishedDate: item?.volumeInfo?.publishedDate,
                    categories: item?.volumeInfo?.categories,
                    imageLink: item?.volumeInfo?.imageLinks?.thumbnail,
                }
                return newObj
            })
            return [mappedArray,data.totalItems];
        };
        
        try {
            const fetchedData = await fetchData();
            dispatch(dataActions.fetchBooks(fetchedData[0]));
            dispatch(dataActions.fetchTotalItems(fetchedData[1]));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            dispatch(dataActions.finishedRequest('success'))    
            console.log(e);
        }
    };
};

export const fetchingBook = (bookId) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchBook = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${bookId}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            const newObj = {
                id: data?.id,
                etag: data?.etag,
                title: data?.volumeInfo?.title,
                authors: data?.volumeInfo?.authors,
                categories: data?.volumeInfo?.categories,
                imageLink: data?.volumeInfo?.imageLinks?.thumbnail,
                description: data?.volumeInfo?.description,

            }
                return newObj
        };

        try {
            const fetchedBook = await fetchBook();
            dispatch(dataActions.fetchBook(fetchedBook));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};

export const fetchingMoreData = (numberToAdd,searchInput,orderBy,categoryBy) => {
    
    return async (dispatch) => {
        const fetchMoreBooks = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}${categoryBy}&orderBy=${orderBy}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=30&startIndex=${numberToAdd}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            const mappedArray =  data.items.map((item)=>{
                const newObj = {
                    id: item?.id,
                    etag: item?.etag,
                    title: item?.volumeInfo?.title,
                    authors: item?.volumeInfo?.authors,
                    piblishedDate: item?.volumeInfo?.publishedDate,
                    categories: item?.volumeInfo?.categories,
                    imageLink: item?.volumeInfo?.imageLinks?.thumbnail,
                }
                return newObj
            })
            return mappedArray;
        };

        try {
            const fetchedMoreBooks = await fetchMoreBooks();
            dispatch(dataActions.fetchMoreBooks(fetchedMoreBooks));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};