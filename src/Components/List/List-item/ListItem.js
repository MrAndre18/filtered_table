import React, { useEffect, useRef } from 'react';
import './ListItem.css';

function ListItem({ id, name, comment, filterText }) {
  const listItem = useRef(null);

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

  const insertMark = (listField, insertPosition, insertLength) => {
    const markedField = listField.slice(0, insertPosition) + 
                        '<mark>' + 
                        listField.slice(insertPosition, insertPosition + insertLength) + 
                        '</mark>' + 
                        listField.slice(insertPosition + insertLength);

    return markedField;
  }

  return (
    <li ref={ listItem } className={ `list__item list__item-${id}` }>
      <div className="list__item-id">{ id }</div>
      <div className="list__item-name">{ name }</div>
      <div className="list__item-comment">{ comment }</div>
    </li>
  );
}

export default ListItem;