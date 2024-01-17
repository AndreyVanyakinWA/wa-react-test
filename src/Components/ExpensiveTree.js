import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function ExpensiveTree({ input }) {
  useEffect(() => {
    const performanceCheck = setTimeout(() => {
      perform()
    }, 300)

    return () => clearTimeout(performanceCheck)
  }, [input])

  const perform = () => {
    const now = performance.now()
    while (performance.now() - now < 100) {
      // Emulate some expensive calculations which takes 300ms
    }
  }

  return <div />
}

ExpensiveTree.propTypes = {
  input: PropTypes.string,
}

ExpensiveTree.defaultProps = {
  input: '',
}
export default ExpensiveTree
