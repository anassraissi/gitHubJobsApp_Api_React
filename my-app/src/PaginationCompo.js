import React from 'react'
import { Pagination } from 'react-bootstrap';

function PaginationCompo({ page, setPage, hasNextPage }) {
  function adjustPage(new_state) {
    setPage(prevState => prevState + new_state) // preveState present the real state => page value;
  }
  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)} >1</Pagination.Item>}
      {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)} >{page - 1}</Pagination.Item>}
      {page > 2 && <Pagination.Ellipsis />}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
      {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)}></Pagination.Next>}
    </Pagination>
  )
}

export default PaginationCompo

