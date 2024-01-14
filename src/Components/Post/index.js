import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import { ROOT, POST } from 'Router/routes'

import {
  Column,
  Container,
  Link,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles'

const SortableContainer = sortableContainer(({ children }) => (
  <div>{children}</div>
))

const SortableItem = sortableElement(({ value }) => (
  <PostComment mb={2}>{value}</PostComment>
))

function Post() {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const {
    params: { postId },
  } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, newIndex, oldIndex))
  }

  const currentPostId = parseInt(postId, 10)

  const handlePrev = () => history.push(POST(currentPostId - 1))
  const handleNext = () => history.push(POST(currentPostId + 1))

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })

  const post = data?.post || {}
  const total = data?.posts.meta.totalCount

  useEffect(() => {
    setComments(post.comments?.data || [])
  }, [post])

  return (
    <Container>
      <Column>
        <Link onClick={handleClick}>Back</Link>
      </Column>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>PostAuthor</h4>
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>
              {currentPostId > 1 ? (
                <Link onClick={handlePrev}>Prev</Link>
              ) : undefined}
              {currentPostId < total ? (
                <Link onClick={handleNext}>Next</Link>
              ) : undefined}
            </div>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
            Comments:
            <SortableContainer onSortEnd={handleSortEnd}>
              {comments.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={comment.id}
                  mb={3}
                  value={comment.body}
                />
              ))}
            </SortableContainer>
          </Column>
        </>
      )}
    </Container>
  )
}

export default Post
