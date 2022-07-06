import React from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./BookItem.module.css"

const BookItem = (props) => {
    const navigate = useNavigate()

  return (
    <div className={styles.bookItem}>
    <img src={props.image} onClick={()=>{navigate(`/book/${props.id}`)}}/>
    <div className={styles.bookInfo}>
    <div className={styles.title}>{props.title}</div>
    <div>Категория: {props.categories}</div>
    <div>Автор: {props.authors}</div>
    </div>
    <button className={styles.btn} onClick={()=>{navigate(`/book/${props.id}`)}}>More info</button>
    </div>
  )
}

export default BookItem
