import React, { useEffect, useState } from 'react'
import {fetchingData, fetchingMoreData} from "../features/data-fetch/data-slice";
import {useDispatch, useSelector} from "react-redux"
import BookList from '../components/BookList';
import { dataActions } from '../features/data-fetch/data-action';

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
    }
    const categoryByHandler = (e) => {
      if(e.target.value==='all'){
        setCategoryBy('')  
      } else {
      setCategoryBy( `+subject:${e.target.value}`);}
      
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
    <>
    <div>MainPage</div>
    <div>
      <form onSubmit={searchHandler}>
      <input
            type="search"
            onChange={inputHandler}
            placeholder="Search a book..."
            maxLength="50"
          />
          <button type='submit' disabled={searchInput.length<1}>Search</button>
      </form>
    </div>
    <div>
            <select
              onChange={orderByHandler}
              id="order"
              name="order"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
    </div>
    <div>
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
    <BookList onFetchMoreHandler={fetchMoreHandler}/>
    </>
  )
}

export default MainPage