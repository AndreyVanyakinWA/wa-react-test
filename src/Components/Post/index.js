import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import { ROOT } from 'Router/routes'

import {
  Back,
  Column,
  Container,
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

  const [singlePostId, setSinglePostId] = useState(postId)
  const [savedPostIds, setSavedPostIds] = useState([])
  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, newIndex, oldIndex))
  }

  const { data, loading } = useQuery(postQuery, {
    variables: { id: singlePostId },
  })

  const post = data?.post || {}

  useEffect(() => {
    const saved = localStorage.getItem('postIds')
    setSavedPostIds(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (post && post.comment?.data) {
      setComments(post.comments?.data)
    }
  }, [post])

  const handleNextClick = () => {
    const index = savedPostIds.indexOf(singlePostId)
    setSinglePostId(savedPostIds[index + 1])
  }

  const handlePreviousClick = () => {
    const index = savedPostIds.indexOf(singlePostId)
    setSinglePostId(savedPostIds[index - 1])
  }

  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>Need to add next/previous links</h4>
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>Next/prev here</div>
            <button
              disabled={singlePostId === savedPostIds[0]}
              type="button"
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              disabled={singlePostId === savedPostIds[savedPostIds.length - 1]}
              type="button"
              onClick={handleNextClick}
            >
              Next
            </button>
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
