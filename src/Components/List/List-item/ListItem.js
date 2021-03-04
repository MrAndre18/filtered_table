import React from 'react';
import './ListItem.css';

function ListItem({ id, name, comment }) {

  return (
    <li className="list__item">
      <div className="list__item-id">{ id }</div>
      <div className="list__item-name">{ name }</div>
      <div className="list__item-comment">{ comment }</div>
    </li>
  );
}

export default ListItem;