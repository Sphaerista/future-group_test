import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions } from '../features/data-fetch/data-action'
import BookItem from '../router/BookItem'

const BookList = (props) => {
    const dispatch = useDispatch()
    let list = props.list.items
    const moreData=props.moreData
   
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
    if(moreData.length>0){
      list=[...list,...moreData]
      console.log(list,moreData)
    }

      // checking list existence
  const validdd = list?.length > 0 && requestStatus==='success'
  const notValiddd = list?.length < 1 && requestStatus==='success'
  const notFinished = list?.length < 1 && requestStatus==='pending'
  const notYetFinished = list?.length > 0 && requestStatus==='pending'

  return (
    <>
    <div>BookList</div>
    {validdd && 
    <>
    <div>total books found: {props.list.totalItems}</div>
    {list.map((data)=>{
        return <BookItem key={data.etag} id={data.id} title={data.volumeInfo.title} etag={data.etag} selfLink={data.selfLink}  />;
    })}
    <h4>finished!</h4>
    <button onClick={props.onFetchMoreHandler}>click to fetch 3 more</button>
    </>
    }
    {notValiddd && <h4>There are no users!</h4> }
    {notFinished && <h4>Loading the data</h4>}
    {notYetFinished && <h4>Pending NOT null</h4>}
    </>
  )
}

export default BookList