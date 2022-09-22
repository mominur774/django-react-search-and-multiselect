import React from 'react'

const Pagination = ({ pageLinks, next, previous, getData }) => {
  return (<>
    {pageLinks?.length > 1 &&
      <nav aria-label="">
        <ul className="pagination">
          <li className={previous ? "page-item" : "page-item disabled"}>
            <a onClick={() => getData(previous)} className="page-link">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageLinks?.length && pageLinks?.map((item, index) => {
            if (item[0] !== null) {
              return (
                <li key={index} className={item[2] ? "page-item active" : "page-item"}>
                  <a onClick={() => getData(item[1])} className="page-link">{item[1]}</a>
                </li>)
            } else {
              return (
                <li key={index} className="page-item">
                  <a className="page-link">...</a>
                </li>)
            }
          })}

          <li className={next ? "page-item" : "page-item disabled"}>
            <a onClick={() => getData(next)} className="page-link">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>

        </ul>
      </nav>}
  </>)
}

export default Pagination