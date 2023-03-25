/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { dataActions } from "../features/data-action";
import { fetchingBook } from "../features/data-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./BookPage.module.css";

const BookPage: React.FC = () => {
  // avoid recalling data
  let value = true;

  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.fetchData.book);
  const params = useParams().id as string;
  const navigate = useNavigate();
  const requestStatus = useSelector(
    (state: RootState) => state.fetchData.status
  );

  useEffect(() => {
    if (value && params) {
      dispatch(fetchingBook(params));
      value = false;
      dispatch(dataActions.fetchBook([]));
    }
    return;
  }, [dispatch, params]);

  // checking book existence
  const validdd = requestStatus === "success" && book;
  const notValiddd = requestStatus === "success";
  const notFinished = requestStatus === "pending";

  return (
    <>
      {validdd && (
        <div className={styles.outer}>
          <div className={styles.bookItem}>
            <img src={book.imageLink} />
            <div className={styles.bookInfo}>
              <div className={styles.title}>{book.title}</div>
              {book.categories && <div>Категория: {book.categories}</div>}
              {book.authors && <div>Автор: {book.authors}</div>}
              <div dangerouslySetInnerHTML={{ __html: book.description }}></div>
              <div className={styles.backBtn}>
                <button onClick={() => navigate(-1)}>Back</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {notFinished && (
        <div className={styles.spinner}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default BookPage;
