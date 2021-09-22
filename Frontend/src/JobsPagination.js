import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationItem({ page, active = false, clickHandler }) {
  return (
    <Pagination.Item active={active} onClick={() => clickHandler(page)}>
      {page}
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
      <Pagination>
        {page !== 1 && (
          <>
            <Pagination.First disabled={true} />
            <Pagination.Prev />
          </>
        )}
        {Array.from(new Set(pages)).map((p) => (
          <PaginationItem
            page={p}
            active={p === page}
            clickHandler={clickHandler}
          />
        ))}
        {page !== totalPages && (
          <>
            <Pagination.Next onClick={() => page + 1} />
            <Pagination.Last onClick={() => setPage(7)} />
          </>
        )}
      </Pagination>
      <span>of {totalPages}</span>
    </div>
  );

  // return (
  //   <Pagination>
  //     {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
  //     {page !== 1 && (
  //       <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
  //     )}
  //     {page > 2 && <Pagination.Ellipsis />}
  //     {page > 2 && (
  //       <Pagination.Item onClick={() => adjustPage(-1)}>
  //         {page - 1}
  //       </Pagination.Item>
  //     )}
  //     <Pagination.Item active>{page}</Pagination.Item>
  //     {hasNextPage && (
  //       <Pagination.Item onClick={() => adjustPage(1)}>
  //         {page + 1}
  //       </Pagination.Item>
  //     )}
  //     {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
  //   </Pagination>
  // );
}
