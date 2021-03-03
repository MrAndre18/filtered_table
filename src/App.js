import React, { useState, useEffect } from 'react';
import './App.css';
import List from './Components/List/List';
import Pagination from './Components/Pagination/Pagination';


function App() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getComments();
  }, []);

  const url = 'https://jsonplaceholder.typicode.com/comments';
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

  let lastPageItemIndex = currentPage * itemsPerPage,
      firstPageItemIndex = lastPageItemIndex - itemsPerPage,
      currentList = list.slice(firstPageItemIndex, lastPageItemIndex);

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="title">Comments</h1>
      </div>
      <List list = { currentList }/>
      <Pagination
        totalListCount = { list.length }
        itemsPerPage = { itemsPerPage }
        paginate = { paginate }
      />
    </div>
  );
}

export default App;
