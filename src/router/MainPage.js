/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {fetchingData, fetchingMoreData} from "../features/data-fetch/data-slice";
import {useDispatch, useSelector} from "react-redux"
import BookList from '../components/BookList';
import styles from "./MainPage.module.css"
import { dataActions } from '../features/data-fetch/data-action';

const MainPage = () => {
    
    const [numberToAdd,setNumberToAdd]= useState(30)
    const [searchInput, setSearchInput] = useState("");
    const [moreSearchInput, setMoreSearchInput] = useState(searchInput);
    const [orderBy, setOrderBy] = useState('relevance');
    const [categoryBy, setCategoryBy] = useState('');
    const dispatch = useDispatch()
    const moreBooksURLData = useSelector(state => state.fetchData.moreBooksURLData)

    const inputHandler = (e) => {
      setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
      e.preventDefault()
      setNumberToAdd(30)
      setMoreSearchInput(searchInput)
      dispatch(fetchingData(searchInput,orderBy,categoryBy))
    }

    const fetchMoreHandler = () => {
      dispatch(fetchingMoreData(numberToAdd,moreSearchInput,orderBy,categoryBy))
      setNumberToAdd((prev)=>prev+30)
    }
    const orderByHandler = (e) => {
      setOrderBy(e.target.value);
      const setOrderNow = e.target.value

      if(searchInput.length>0){
        setNumberToAdd(30)
        setMoreSearchInput(searchInput)
        dispatch(fetchingData(searchInput,setOrderNow,categoryBy))
      }
    }
    const categoryByHandler = (e) => {
      if(e.target.value==='all'){
        setCategoryBy('')  
      } else {
      setCategoryBy( `+subject:${e.target.value}`);}
      const setCategoryNow = `+subject:${e.target.value}`

      if(searchInput.length>0){
      setNumberToAdd(30)
      setMoreSearchInput(searchInput)
      dispatch(fetchingData(searchInput,orderBy,setCategoryNow))
    }
      
    }
    
    const dataForBackup = [numberToAdd,moreSearchInput,orderBy,categoryBy]
    useEffect(()=>{
      if(moreBooksURLData.length>0){
        setNumberToAdd(moreBooksURLData[0])
        setMoreSearchInput(moreBooksURLData[1])
        setOrderBy(moreBooksURLData[2])
        setCategoryBy(moreBooksURLData[3])
      }
  },[]);
    useEffect(()=>{
        dispatch(dataActions.fetchMoreBooksURLData(dataForBackup));
    },[numberToAdd,moreSearchInput,orderBy,categoryBy]);

  return (
    <div className={styles.mainOuter}>
    <div className={styles.header}>
    <h2>Search for books</h2>
    <div>
      <form className={styles.searchForm} onSubmit={searchHandler}>
      <input
            type="search"
            onChange={inputHandler}
            placeholder="Search a book..."
            maxLength="50"
          />
          <button type='submit' disabled={searchInput.length<1}>Search</button>
      </form>
    </div>
    <div className={styles.selection}>
    <div className={styles.byOrder}>Sorted by
            <select
              onChange={orderByHandler}
              id="order"
              name="order"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
    </div>
    <div className={styles.byCategory}>Categories
            <select
              onChange={categoryByHandler}
              id="category"
              name="category"
            >
              <option value="all">All</option>
              <option value="art">Art</option>
              <option value="biography">Biography</option>
              <option value="computers">Computers</option>
              <option value="history">History</option>
              <option value="medical">Medical</option>
              <option value="poetry">Poetry</option>
            </select>
    </div>
    </div>
    </div>
    <BookList onFetchMoreHandler={fetchMoreHandler}/>
    </div>
  )
}

export default MainPage