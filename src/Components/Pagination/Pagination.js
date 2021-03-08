import React from 'react';
import './Pagination.css';

function Pagination({ totalListCount, itemsPerPage, paginate, currentPage }) {
  let paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(totalListCount / itemsPerPage); i++) {
    paginationNumbers.push(i)
  }

  const changePage = (number, curBtn) => {
    if ( number !== currentPage ) {
      let paginationBtns = document.querySelectorAll('.pagination__item-btn');

      if (!curBtn.classList.contains('pagination__item-btn_active')) {
        paginationBtns.forEach(element => {
          element.classList.remove('pagination__item-btn_active');
        });
  
        curBtn.classList.add('pagination__item-btn_active');
      }
  
      paginate(number)
    }
  }

  return (
    <ul className="pagination">
    {
      paginationNumbers.map((number, index) => (
        <li key={number} className="pagination__item">
          <button onClick={(e) => changePage(number, e.currentTarget)} className={`pagination__item-btn ${index === 0 ? `pagination__item-btn_active` : ``}`}><span>{number}</span></button>
        </li>
      ))
    }
    </ul>
  )
}

export default Pagination;
