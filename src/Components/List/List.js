import React, { useState, useEffect } from 'react';
import './List.css';
import ListItem from './List-item/ListItem';

function List({ list }) {
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const listCopy = [...list];
    const listButtons = document.querySelectorAll('.list__header-sort-btn');

    setSortedList(listCopy);
    listButtons.forEach(element => {
      element.classList.remove('sort-asc', 'sort-desc');
    });
    
  }, [list]);

  const sortingList = (field, type) => {
    switch (type) {
      case 'asc': {
        const listCopy = [...sortedList];
        listCopy.sort((a, b) => a[field] > b[field] ? 1 : -1);
        setSortedList(listCopy);
        break;
      }
      case 'desc': {
        const listCopy = [...sortedList];
        listCopy.sort((a, b) => a[field] < b[field] ? 1 : -1);
        setSortedList(listCopy);
        break;
      }
      default: {
        setSortedList([...list]);
        break;
      }
    }
  }

  const switchSorting = e => {
    let btn = null;
    if (e.target.classList.contains('list__header-sort-btn')) {
      btn = e.target;
    } else {
      btn = e.target.closest('.list__header-sort-btn');
    }

    if (!btn) {
      return false;
    }

    const listButtons = document.querySelectorAll('.list__header-sort-btn');
    listButtons.forEach(element => {
      if (element !== btn)
        element.classList.remove('sort-asc', 'sort-desc');
    });

    if (!btn.classList.contains('sort-asc') &&
      !btn.classList.contains('sort-desc')) {

      btn.classList.add('sort-asc');
      sortingList(btn.dataset.type, 'asc');

      return true;
    }
    if (btn.classList.contains('sort-asc')) {

      btn.classList.remove('sort-asc');
      btn.classList.add('sort-desc');
      sortingList(btn.dataset.type, 'desc');

      return true;
    }
    if (btn.classList.contains('sort-desc')) {

      btn.classList.remove('sort-desc');
      sortingList(btn.dataset.type, '');

      return false;
    }
  }

  return (
    <div className="list">
      <div className="list__header">
        <div onClick={(e) => { switchSorting(e) }} data-type="id" className="list__header-id list__header-sort-btn">
          <span>#</span>
        </div>
        <div onClick={(e) => { switchSorting(e) }} data-type="name" className="list__header-name list__header-sort-btn">
          <span>Name</span>
        </div>
        <div onClick={(e) => { switchSorting(e) }} data-type="comment" className="list__header-comment list__header-sort-btn">
          <span>Comment</span>
        </div>
      </div>

      <ul className="list__body">
        {
          sortedList.map(item => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              comment={item.comment}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default List;
