import React from 'react'
import { useSelector } from 'react-redux'
import BookItem from './BookItem'
import LoadingSpinner from '../UI/LoadingSpinner'
import styles from "./BookList.module.css"

const BookList = (props) => {
    const list = useSelector(state => state.fetchData.booksList)
    const totalItems = useSelector(state => state.fetchData.totalItems)
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
      // checking list existence
  const validdd = list?.length > 0 && requestStatus==='success'
  const notValiddd = list?.length < 1 && requestStatus==='success'
  const notFinished = list?.length < 1 && requestStatus==='pending'
  const notYetFinished = list?.length > 0 && requestStatus==='pending'

  return (
    <>
    {validdd && 
    <>
    <div className={styles.bookList}>
    <div className={styles.booksNumber}>Total books found: {totalItems}</div>
    {list?.map((data)=>{
        return <BookItem key={data?.etag} id={data?.id} image={data?.imageLink} title={data?.title} etag={data?.etag} categories={data?.categories} authors={data?.authors}   />;
    })}
    </div>
    {totalItems>30 && <button className={styles.fetchMoreBtn} onClick={props.onFetchMoreHandler}>Load more</button>}
    </>
    }
    {notValiddd && <h4>There are no books! Try again</h4> }
    {notFinished && <LoadingSpinner />}
    {notYetFinished && <LoadingSpinner />}
    </>
  )
}

export default BookList