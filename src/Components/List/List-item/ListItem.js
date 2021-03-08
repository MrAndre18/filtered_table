import React, { useEffect, useRef } from 'react';
import './ListItem.css';

function ListItem({ id, name, comment, filterText }) {
  const listItem = useRef(null);
  
  const insertMark = (listField, insertPosition, insertLength) => {
    const markedField = listField.slice(0, insertPosition) + 
                        '<mark>' + 
                        listField.slice(insertPosition, insertPosition + insertLength) + 
                        '</mark>' + 
                        listField.slice(insertPosition + insertLength);

    return markedField;
  }

  const showItemContent = target => {
    let item = null;
    if (target.classList.contains('list__item')) {
      item = target;
    } else {
      item = target.closest('.list__item');
    }

    if (!item) return false;

    item.classList.toggle('list__item_active');
  }

  useEffect(() => {
    if (filterText !== '') {
      const fields = listItem.current.childNodes;
      fields.forEach(field => {
        if (field.classList.contains('list__item-id')) return;

        if (field.innerText.search(filterText) === -1) {
          field.innerHTML = field.innerText;
        } else {
          const text = field.innerText;
          field.innerHTML = insertMark(text, field.innerText.search(filterText), filterText.length);
        }
      });
    } else {
      const fields = listItem.current.childNodes;
      fields.forEach(field => {
        if (field.classList.contains('list__item-id')) return;
        field.innerHTML = field.innerText;
      });
    }
  }, [filterText])

  return (
    <li ref={ listItem } className="list__item" onClick={ (e) => showItemContent(e.target) }>
      <div className="list__item-id list__item-field">{ id }</div>
      <div className="list__item-name list__item-field">{ name }</div>
      <div className="list__item-comment list__item-field">{ comment }</div>
    </li>
  );
}

export default ListItem;