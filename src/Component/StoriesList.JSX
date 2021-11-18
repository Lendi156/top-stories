import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Button, Typography, CardActions } from '@mui/material'

export default function StoriesList ({ storyId }) {
  const [storyInfo, setStoryInfo] = useState({})
  const getStoryData = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
    const responseJson = await response.json()
    setStoryInfo({ ...responseJson })
  }

  useEffect(() => {
    getStoryData()
  }, [])

  return (
          <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography>
                {storyInfo.title}
              </Typography>
              <Typography>
                Jumlah komentar {storyInfo.kids === undefined ? 0 : storyInfo.kids.length}
              </Typography>
              <Typography>
                {storyInfo.score}
              </Typography>
            </CardContent>
            <CardActions>
                <Button> Details</Button>
            </CardActions>
          </Card>
  )
}

StoriesList.propTypes = {
  storyId: PropTypes.number.isRequired
}
