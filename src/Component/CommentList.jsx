import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'

export default function StoriesList ({ commentId }) {
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
          <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography>
                {commentInfo.by}
              </Typography>
              <Typography>
                Jumlah komentar {commentInfo.text}
              </Typography>
            </CardContent>
          </Card>
  )
}

StoriesList.propTypes = {
  commentId: PropTypes.number.isRequired
}
