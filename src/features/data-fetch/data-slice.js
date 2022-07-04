import { dataActions } from "./data-action";

export const fetchingData = (searchInput,orderBy) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchData = async () => {
            const response = await fetch(
                // add dynamic search in q=... as im my api
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&orderBy=${orderBy}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=3&startIndex=0`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()

            return data;
        };

        try {
            const fetchedData = await fetchData();
            dispatch(dataActions.fetchBooks(fetchedData));
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
        dispatch(dataActions.pendingRequest('pending'))
        const fetchMoreBooks = async () => {
            const response = await fetch(
                // add dynamic search in q=... as im my api
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=3&startIndex=${numberToAdd}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()

            return data;
        };

        try {
            const fetchedMoreBooks = await fetchMoreBooks();
            dispatch(dataActions.fetchMoreBooks(fetchedMoreBooks.items));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};