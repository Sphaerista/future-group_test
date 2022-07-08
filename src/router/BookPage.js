import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"
import { dataActions } from '../features/data-fetch/data-action';
import { fetchingBook } from '../features/data-fetch/data-slice';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from "./BookPage.module.css"


const BookPage = () => {
  // avoid recalling data
  let value = true;
  
  const dispatch = useDispatch()
  const book = useSelector(state => state.fetchData.book)
  const params = useParams().id
  const navigate = useNavigate()
  const requestStatus = useSelector((state)=> state.fetchData.status)
  
  useEffect(()=>{
    if(value) {
      dispatch(fetchingBook(params))
      value = false;
      dispatch(dataActions.fetchBook([]));
    }
      return;
  },[dispatch,params]);

        // checking book existence
        const validdd =  requestStatus==='success'
        const notValiddd = requestStatus==='success'
        const notFinished = book?.length < 1 && requestStatus==='pending'
        const notYetFinished = book?.length > 0 && requestStatus==='pending'

  return (
    <>
    {validdd && 
      <div className={styles.outer}>
      <div className={styles.bookItem}>
      <img src={book.imageLink}/>
      <div className={styles.bookInfo}>
      <div className={styles.title}>{book.title}</div>
      <div>Категория: {book.categories}</div>
      <div>Автор: {book.authors}</div>
      <div>{book.description}</div>
      <div className={styles.backBtn}>
      <button onClick={() => navigate(-1)}>Back</button>
      </div>
      </div>
      </div>
      </div>}
      {notFinished && 
      <div className={styles.spinner}>
        <LoadingSpinner />
      </div>}
      {notYetFinished && 
      <div className={styles.spinner}>
      <LoadingSpinner />
    </div>}
      </>
  )
}

export default BookPage