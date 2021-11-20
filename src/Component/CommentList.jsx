import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Divider } from '@mui/material'
import style from '../Style'

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
