import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions } from '../features/data-fetch/data-action'
import BookItem from '../router/BookItem'

const BookList = (props) => {
    const dispatch = useDispatch()
    const list = useSelector(state => state.fetchData.booksList)
    const totalItems = useSelector(state => state.fetchData.totalItems)
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
      // checking list existence
  const validdd = list?.length > 0 && requestStatus==='success'
  const notValiddd = list?.length < 1 && requestStatus==='success'
  const notFinished = list?.length < 1 && requestStatus==='pending'
  const notYetFinished = list?.length > 0 && requestStatus==='pending'

  console.log(list)

  return (
    <>
    <div>BookList</div>
    {validdd && 
    <>
    <div>total books found: {totalItems}</div>
    {list?.map((data)=>{
        return <BookItem key={data?.etag} id={data?.id} title={data?.title} etag={data?.etag} categories={data?.categories} authors={data?.authors}   />;
    })}
    <h4>finished!</h4>
    <button onClick={props.onFetchMoreHandler}>click to fetch 3 more</button>
    </>
    }
    {notValiddd && <h4>There are no books! Try again</h4> }
    {notFinished && <h4>Loading the data</h4>}
    {notYetFinished && <h4>Loading the data</h4>}
    </>
  )
}

export default BookList