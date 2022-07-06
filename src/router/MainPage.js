import React, { useEffect, useState } from 'react'
import {fetchingData, fetchingMoreData} from "../features/data-fetch/data-slice";
import {useDispatch, useSelector} from "react-redux"
import BookList from '../components/BookList';
import styles from "./MainPage.module.css"

// avoid recalling data
let value = true;

const MainPage = () => {
    
    const [numberToAdd,setNumberToAdd]= useState(3)
    const [searchInput, setSearchInput] = useState("");
    const [moreSearchInput, setMoreSearchInput] = useState(searchInput);
    const [orderBy, setOrderBy] = useState('relevance');
    const [categoryBy, setCategoryBy] = useState('');
    const dispatch = useDispatch()
    // const list = useSelector(state => state.fetchData.books)
    // const moreData = useSelector(state => state.fetchData.moreBooks)

    const inputHandler = (e) => {
      setSearchInput(e.target.value);
    };
    const searchHandler = (e) => {
      e.preventDefault()
      // dispatch(dataActions.fetchMoreBooks('clear'));
      setMoreSearchInput(searchInput)
      dispatch(fetchingData(searchInput,orderBy,categoryBy))
    }

    const fetchMoreHandler = () => {
      dispatch(fetchingMoreData(numberToAdd,moreSearchInput,categoryBy))
      setNumberToAdd((prev)=>prev+3)
    }
    const orderByHandler = (e) => {
      setOrderBy(e.target.value);
      const setOrderNow = e.target.value

      if(searchInput.length>0){
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
      setMoreSearchInput(searchInput)
      dispatch(fetchingData(searchInput,orderBy,setCategoryNow))
    }
      
    }

    // useEffect(()=>{
    //     if(value) {
    //         dispatch(fetchingData())
    //         value = false
    //     }
    //     return;
    // },[dispatch]);
    
    console.log(categoryBy)
    // console.log(moreData)

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