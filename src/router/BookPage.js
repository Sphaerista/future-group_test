import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { dataActions } from '../features/data-fetch/data-action';
import { fetchingBook } from '../features/data-fetch/data-slice';


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
    <>
    <div>BookPage</div>
    <h1>{book.id}</h1>
    <h2>{book.volumeInfo?.title}</h2>
    </>
  )
}

export default BookPage