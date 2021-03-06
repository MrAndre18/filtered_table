import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './Components/Filter/Filter';
import List from './Components/List/List';
import Pagination from './Components/Pagination/Pagination';


function App() {
  const [list, setList] = useState([]),
        [filteredList, setFilteredList] = useState([]),
        [filterText, setFilterText] = useState(''),
        [currentList, setCurrentList] = useState([]),
        [currentPage, setCurrentPage] = useState(1),
        [itemsPerPage] = useState(49),
        [isLoading, setIsLoading] = useState(true),
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
      setIsLoading(false);
    } else {
      console.error('Ошибка ', response.status)
    }
  }

  const filteringList = (text) => {
    setFilterText(text);

    if (text !== '') {
      const newList = list.filter(item => item.name.search(text) !== -1 || item.comment.search(text) !== -1);

      setFilteredList(newList);
    } else {
      setFilteredList([...list]);
    }
  }

  useEffect(() => {
    setFilteredList([...list]);
  }, [list]);

  useEffect(() => {
    getComments();
  }, []);

  // Не выводятся элементы, если их меньше itemsPerPage

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
      <List
        list = { currentList }
        filterText = { filterText }
        isLoading = { isLoading }
      />
      { filteredList.length > itemsPerPage && (
        <Pagination
          totalListCount = { filteredList.length }
          itemsPerPage = { itemsPerPage }
          paginate = { paginate }
          currentPage = { currentPage }
        />
      )
      }
    </div>
  );
}

export default App;
