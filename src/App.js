import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './Components/Filter/Filter';
import List from './Components/List/List';
import Pagination from './Components/Pagination/Pagination';


function App() {
  const [list, setList] = useState([]),
        [filteredList, setFilteredList] = useState([]),
        [currentList, setCurrentList] = useState([]),
        [currentPage, setCurrentPage] = useState(1),
        [itemsPerPage] = useState(50),
        url = 'https://jsonplaceholder.typicode.com/comments';

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const getComments = async () => {
    let response = await fetch(url);

    if (response.ok) {
      let responseValue = await response.json();
      const list = responseValue.map(item => {
        return {
          id: item.id,
          name: item.name,
          comment: item.body
        }
      });
      setList(list);
    } else {
      console.error('Ошибка ', response.status)
    }
  }
  
  const insertMark = (listField, insertPosition, insertLength) => {
    const markedField = listField.slice(0, insertPosition) + 
                        '<mark>' + 
                        listField.slice(insertPosition, insertPosition + insertLength) + 
                        '</mark>' + 
                        listField.slice(insertPosition + insertLength);

    return markedField;
  }

  const filteringList = (text) => {
    if (text !== '') {
      const newList = list.filter(item => item.name.search(text) !== -1 || item.comment.search(text) !== -1);

      // newList.map(item => (
      //   if (item.name.search(text) !== -1) {
      //     item.name = insertMark(item.name, item.name.search(text), text.length)
      //   }
      //   if (item.comment.search(text) !== -1) {
      //     item.comment = insertMark(item.comment, item.comment.search(text), text.length)
      //   }
      // ));
      
      setFilteredList(newList);
    } else {
      setFilteredList([...list]);
    }
    console.log('list: ', list);
    console.log('filteredList: ', filteredList);
  }

  useEffect(() => {
    setFilteredList([...list]);
  }, [list]);

  useEffect(() => {
    getComments();
  }, []);

  let lastPageItemIndex = currentPage * itemsPerPage,
      firstPageItemIndex = lastPageItemIndex - itemsPerPage;

  useEffect(() => {
    setCurrentList(() => filteredList.slice(firstPageItemIndex, lastPageItemIndex));
  }, [currentPage, firstPageItemIndex, lastPageItemIndex, filteredList]);

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="title">Comments</h1>
        <Filter filteringList = { filteringList } />
      </div>
      <List list = { currentList }/>
      <Pagination
        totalListCount = { filteredList.length }
        itemsPerPage = { itemsPerPage }
        paginate = { paginate }
        currentPage = { currentPage }
      />
    </div>
  );
}

export default App;
