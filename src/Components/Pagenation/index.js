import React from 'react'
import PropTypes from 'prop-types'

import { generatePages } from './utils'

function Pagenation({ current, total, limit, onClick }) {
  const pages = generatePages(total, limit)
  return (
    <div>
      {current > 1 ? (
        <button type="button" onClick={() => onClick(current - 1)}>
          prev
        </button>
      ) : undefined}
      {pages.map(page => (
        <button
          disabled={page === current}
          key={page}
          type="button"
          onClick={() => onClick(page)}
        >
          {page}
        </button>
      ))}
      {current < total / limit ? (
        <button type="button" onClick={() => onClick(current + 1)}>
          next
        </button>
      ) : undefined}
    </div>
  )
}

Pagenation.propTypes = {
  current: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Pagenation
