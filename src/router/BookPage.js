import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { dataActions } from '../features/data-fetch/data-action';
import { fetchingBook } from '../features/data-fetch/data-slice';
import styles from "./BookPage.module.css"


const BookPage = () => {
  // avoid recalling data
  let value = true;
  
  const dispatch = useDispatch()
  const book = useSelector(state => state.fetchData.book)
  const params = useParams().id
  
  useEffect(()=>{
    if(value) {
      dispatch(fetchingBook(params))
      value = false;
      dispatch(dataActions.fetchBook([]));
    }
      return;
  },[dispatch,params]);

  console.log(book)
  return (
    <div className={styles.outer}>
    <div className={styles.bookItem}>
    <img src={book.imageLink}/>
    <div className={styles.bookInfo}>
    <div className={styles.title}>{book.title}</div>
    <div>Категория: {book.categories}</div>
    <div>Автор: {book.authors}</div>
    <div>{book.description}</div>
    </div>
    </div>
    </div>
  )
}

export default BookPage