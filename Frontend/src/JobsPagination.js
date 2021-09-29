import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationItem({ page, active = false, clickHandler }) {
  return (
    <Pagination.Item active={active} onClick={() => clickHandler(page)}>
      {page.toLocaleString('en-US')}
    </Pagination.Item>
  );
}

export default function JobsPagination({ page, setPage, totalPages }) {
  // 1 2 3 4 5 > >> of total
  // << < 3 4 5 6 7 > >> of total
  function clickHandler(linkPage) {
    if (page === linkPage) return;
    setPage(linkPage);
  }
  const pages = [
    Math.max(page - 2, 1),
    Math.max(page - 1, 1),
    page,
    Math.min(page + 1, totalPages),
    Math.min(page + 2, totalPages),
  ];

  return (
    <div>
      <div className='pageNum'>
        Page {page.toLocaleString('en-US')} of{' '}
        {totalPages.toLocaleString('en-US')}
      </div>
      <Pagination>
        <Pagination.First
          onClick={() => clickHandler(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          onClick={() => clickHandler(page - 1)}
          disabled={page === 1}
        />

        {Array.from(new Set(pages)).map((p) => (
          <PaginationItem
            page={p}
            active={p === page}
            clickHandler={clickHandler}
            key={p}
          />
        ))}

        <Pagination.Next
          onClick={(() => clickHandler(page + 1), window.scrollTo(0, 0))}
          disabled={page === totalPages}
        />
        <Pagination.Last
          onClick={() => clickHandler(totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  );
}
