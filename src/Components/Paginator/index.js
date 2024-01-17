import React from 'react'
import PropTypes from 'prop-types'

const Paginator = props => {
  const {
    totalCount,
    itemsPerPage,
    currentPage,
    maxPageNumbersToShow = 4,
    onPageNumberClick,
  } = props
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const getPageNumbers = () => {
    const displayPageNumbers = []
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    )
    for (
      let i = startPage;
      i <= Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
      // eslint-disable-next-line no-plusplus
      i++
    ) {
      displayPageNumbers.push(i)
    }

    return displayPageNumbers
  }
  const pageNumbers = getPageNumbers()
  return (
    <div>
      {pageNumbers.map(page => (
        <button
          disabled={currentPage === page}
          key={page}
          type="button"
          onClick={() => onPageNumberClick(page)}
        >
          {page}
        </button>
      ))}
      {totalPages > maxPageNumbersToShow &&
      currentPage < totalPages - Math.floor(maxPageNumbersToShow / 2) ? (
        <>
          <span>...</span>
          <button type="button" onClick={() => onPageNumberClick(totalPages)}>
            {totalPages}
          </button>
        </>
      ) : null}
    </div>
  )
}

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  maxPageNumbersToShow: PropTypes.number,
  totalCount: PropTypes.number.isRequired,
  onPageNumberClick: PropTypes.func.isRequired,
}

Paginator.defaultProps = {
  maxPageNumbersToShow: 5,
}
export default Paginator
