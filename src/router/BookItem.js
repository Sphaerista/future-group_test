import React from 'react'
import { useNavigate } from "react-router-dom"

const BookItem = (props) => {
    const navigate = useNavigate()

  return (
    <>
    <h5>BookItem</h5>
    <div>{props.title}</div>
    <div>{props.selfLink}</div>
    <button onClick={()=>{navigate(`/book/${props.id}`)}}>{props.etag}</button>
    </>
  )
}

export default BookItem