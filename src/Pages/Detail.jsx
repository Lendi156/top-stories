import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Typography, Stack } from '@mui/material'

export default function Detail () {
  const story = useSelector((state) => state.storyId.id)
  const [storyData, setStoryData] = useState({})
  const getStoryData = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`)
    const responseJson = await response.json()
    setStoryData({ ...responseJson })
  }

  useEffect(() => {
    getStoryData()
  }, [])

  return (
    <Container maxWidth="sm">
        <Stack spacing={2} sx={{ margin: '80px 0 20px' }}>
          <Typography>
              {storyData.title}
          </Typography>
          <Typography>
              {storyData.by}
          </Typography>
          <Typography>
              {storyData.time}
          </Typography>
          <Typography>
              {storyData.type}
          </Typography>
          <Typography>
              {storyData.score}
          </Typography>
          <Typography>
              {storyData.descendants}
          </Typography>
          <Typography>
              Komentar
          </Typography>
        </Stack>
    </Container>
  )
}
