import React from 'react';
import './List.css';
import ListItem from './List-item/ListItem';

function List({ list }) {

  return (
    <div className="list">
      <div className="list__header">
        <div className="list__header-number"><span>#</span></div>
        <div className="list__header-name"><span>Name</span></div>
        <div className="list__header-comment"><span>Comment</span></div>
      </div>

      <ul className="list__body">
        {
          list.map((item, index) => (
            <ListItem
              key={index}
              id={index + 1}
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
