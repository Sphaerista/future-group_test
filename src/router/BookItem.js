import React from 'react'
import { useNavigate } from "react-router-dom"

const BookItem = (props) => {
    const navigate = useNavigate()

  return (
    <>
    <h5>BookItem</h5>
    <div>Title: {props.title}</div>
    <div>Category: {props.categories}</div>
    <div>Authors: {props.authors}</div>
    <div>{props.imageLink}</div>
    <button onClick={()=>{navigate(`/book/${props.id}`)}}>{props.etag}</button>
    </>
  )
}

export default BookItem
