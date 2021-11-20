import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Divider } from '@mui/material'
import style from '../Style'
import { getCommentData } from '../utils'

export default function CommentList ({ commentId }) {
  const [commentInfo, setCommentInfo] = useState({})

  useEffect(() => {
    getCommentData(commentId, setCommentInfo)
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
