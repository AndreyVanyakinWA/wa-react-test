import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import Pagenation from 'Components/Pagenation'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const [count, setCount] = useState(0)
  const latestCount = useRef(count)
  useEffect(() => {
    latestCount.current = count
  }, [count])
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [page, setPage] = useState(1)

  const LIMIT = 10
  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page,
      limit: LIMIT,
    },
  })

  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${latestCount.current} times`)
    }, 2500)
  }

  const posts = data?.posts.data || []
  const total = data?.posts.meta.totalCount || 0

  return (
    <Container>
      <Column>
        <h4>Post list</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
              <Post key={post.id} mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <div>
          <Pagenation
            current={page}
            limit={LIMIT}
            total={total}
            onClick={setPage}
          />
        </div>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree />

        <h4>Closures?</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={index}>
              {field.name}:<br />
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
