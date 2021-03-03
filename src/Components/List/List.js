import React, { useState, useEffect } from 'react';
import './List.css';
import ListItem from './List-item/ListItem';

function List({ list }) {
  const originalList = list.slice(0);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    const listHeader = document.querySelector('.list__header');

    listHeader.addEventListener('click', function(e) {
      let target = null;
      if (e.target.classList.contains('list__header-sort-btn')) {
        target = e.target;
      } else {
        target = e.target.closest('.list__header-sort-btn');
      }

      if (target) {
        setIsSorting(switchSorting(target));
        sortingList(target.dataset.type);
      }
    });
  }, []);
  
  const sortingList = sortBy => {
    console.log('here');
    console.log('isSorting: ', isSorting);
    if (isSorting) {
      console.log('sortBy: ', sortBy);
    }
  }
  const switchSorting = btn => {
    if (!btn.classList.contains('sort-asc') &&
        !btn.classList.contains('sort-desc')) {
      btn.classList.add('sort-asc');
      return true;
    }
    if (btn.classList.contains('sort-asc')) {
      btn.classList.remove('sort-asc');
      btn.classList.add('sort-desc');
      return true;
    }
    if (btn.classList.contains('sort-desc')) {
      btn.classList.remove('sort-desc');
      return false;
    }
  }

  return (
    <div className="list">
      <div className="list__header">
        <div data-type="id" className="list__header-number list__header-sort-btn">
          <span>#</span>
        </div>
        <div data-type="name" className="list__header-name list__header-sort-btn">
          <span>Name</span>
        </div>
        <div data-type="comment" className="list__header-comment list__header-sort-btn">
          <span>Comment</span>
        </div>
      </div>

      <ul className="list__body">
        {
          list.map((item) => (
            <ListItem
              key={item.id}
              number={item.id}
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
