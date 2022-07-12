
import React, { useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import List from "./components/List";
import SearchForm from "./components/SearchForm";

import classes from './App.module.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// const initialStories = [
//   {
//     title: 'React',
//     url: 'www.react.org',
//     author: 'Micheal Jordan',
//     num_comment: 3,
//     points: 4,
//     objectID: 1,
//   },
//   {
//     title: 'Vue',
//     url: 'www.vue.org',
//     author: 'Express Obat',
//     num_comment: 5,
//     points: 10,
//     objectID: 2,
//   }
// // ];

// const getAsyncStories = () =>
//   new Promise(resolve =>
//     setTimeout(() => resolve({ data: { stories: initialStories } }),
//       1000
//     ));

// const getAsyncStories = () =>
//   new Promise((resolve, reject) => setTimeout(reject, 1000));


const useSemiPersistentState = (key, initialState) => {

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};


const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};




function App() {


  const [searchText, setSearchText] = useSemiPersistentState('search');

  // const [stories, setStories] = useState([]);

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchText}`);

  const handleSearchInput = event => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    setUrl(`${API_ENDPOINT}${searchText}`);
    e.preventDefault();
    console.log('i am clicked');

  };


  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  // const handleFetchStories = useCallback(() => {
  //   dispatchStories({ type: 'STORIES_FETCH_INIT' });

  //   axios
  //     .get(url)
  //     .then(result => {
  //       dispatchStories({
  //         type: 'STORIES_FETCH_SUCCESS',
  //         payload: result.hits,
  //       });

  //     })
  //     .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
  //     );
  // }, [url]);

  // useEffect(() => {
  //   handleFetchStories();
  // }, [handleFetchStories]);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    }
    catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const searchHandler = (event) => {
    setSearchText(event.target.value);

  };
  // const searchStories = stories.data.filter(story =>
  //   story.title.toLowerCase().includes(searchText.toLowerCase())
  // );


  return (
    <div className={classes.container}>
      <h1 className={classes.headlinePrimary}>My Hacker Stories</h1>
      <SearchForm
        onSearch={searchHandler}
        searchText={searchText}
        onSearchSubmit={handleSearchSubmit}
        onSearchInput={handleSearchInput}
      />

      {stories.isError && <p>Something went wrong.....</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (<List list={stories.data} onRemoveItem={handleRemoveStory} />)}


    </div>
  );
}

export default App;
