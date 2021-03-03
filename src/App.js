import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List/List';


function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const url = 'https://jsonplaceholder.typicode.com/comments';
  const getComments = async () => {
    console.log('getComments: ############');
    let response = await fetch(url);

    if (response.ok) {
      let responseValue = await response.json();
      const list = responseValue.map(item => {
        return {
          name: item.name,
          comment: item.body
        }
      });
      setList(list);
    } else {
      console.error('Ошибка ', response.status)
    }
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="title">Comments</h1>
      </div>
      <List list={ list }/>
    </div>
  );
}

export default App;
