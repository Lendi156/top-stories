import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Divider } from '@mui/material'

const style = {
  commentCard: {
    padding: '12px'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    fontFamily: 'Lato'
  },
  divider: {
    margin: '12px 0',
    borderBottomWidth: 2,
    background: 'black'
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '140%',
    fontWeight: '400'
  }
}

export default function CommentList ({ commentId }) {
  const [commentInfo, setCommentInfo] = useState({})
  const getCommentData = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
    const responseJson = await response.json()
    setCommentInfo({ ...responseJson })
  }

  useEffect(() => {
    getCommentData()
  }, [])

  return (
          <Card sx={style.commentCard}>
            <CardContent>
              <Typography sx={style.cardTitle}>
                {commentInfo.by}
              </Typography>
              <Divider sx={style.divider}/>
              <Typography sx={style.paragraph}>
                {commentInfo.text}
              </Typography>
            </CardContent>
          </Card>
  )
}

CommentList.propTypes = {
  commentId: PropTypes.number.isRequired
}
