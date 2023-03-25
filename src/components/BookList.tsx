import React from "react";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./BookList.module.css";
import { RootState } from "../app/store";

type BookListProps = {
  onFetchMoreHandler: () => void;
};

const BookList: React.FC<BookListProps> = ({ onFetchMoreHandler }) => {
  const list = useSelector((state: RootState) => state.fetchData.booksList);
  const totalItems = useSelector(
    (state: RootState) => state.fetchData.totalItems
  );
  const requestStatus = useSelector(
    (state: RootState) => state.fetchData.status
  );

  // checking list existence
  const validdd = list?.length > 0 && requestStatus === "success";
  const notValiddd = list?.length < 1 && requestStatus === "success";
  const notFinished = list?.length < 1 && requestStatus === "pending";
  const notYetFinished = list?.length > 0 && requestStatus === "pending";

  // check this typeof totalItems === "number"
  return (
    <>
      {validdd && (
        <>
          <div className={styles.bookList}>
            <div className={styles.booksNumber}>
              Total books found: {totalItems}
            </div>
            {list?.map((data) => {
              return (
                <BookItem
                  key={data?.etag}
                  id={data?.id}
                  image={data?.imageLink}
                  title={data?.title}
                  categories={data?.categories}
                  authors={data?.authors}
                />
              );
            })}
          </div>
          {typeof totalItems === "number" && totalItems > 30 && (
            <button
              className={styles.fetchMoreBtn}
              onClick={onFetchMoreHandler}
            >
              Load more
            </button>
          )}
        </>
      )}
      {notValiddd && <h4>There are no books! Try again</h4>}
      {notFinished && <LoadingSpinner />}
      {notYetFinished && <LoadingSpinner />}
    </>
  );
};

export default BookList;
