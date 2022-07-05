import { dataActions } from "./data-action";

export const fetchingData = (searchInput,orderBy) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchData = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&orderBy=${orderBy}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=3&startIndex=0`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            // console.log("data:::",data);
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
            // console.log(mappedArray)
            return [mappedArray,data.totalItems];
        };

        try {
            const fetchedData = await fetchData();
            // console.log(fetchedData[0])
            dispatch(dataActions.fetchBooks(fetchedData[0]));
            dispatch(dataActions.fetchTotalItems(fetchedData[1]));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};

export const fetchingBook = (bookId) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchBook = async () => {
            const response = await fetch(
                // add dynamic search in q=... as im my api
                `https://www.googleapis.com/books/v1/volumes/${bookId}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()

            return data;
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

export const fetchingMoreData = (numberToAdd,searchInput) => {
    
    return async (dispatch) => {
        // dispatch(dataActions.pendingRequest('pending'))
        const fetchMoreBooks = async () => {
            const response = await fetch(
                // add dynamic search in q=... as im my api
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=3&startIndex=${numberToAdd}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()

            // console.log("data:::",data);
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
            // console.log(mappedArray)
            return mappedArray;

            // return data;
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