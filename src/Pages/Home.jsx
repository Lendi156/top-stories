import React, { useState, useEffect } from 'react'
import { Container, Stack } from '@mui/material'
import StoriesList from '../Component/StoriesList'

export default function Home () {
  const [topStoryList, seTopStoryList] = useState([])
  const [first] = useState(0)
  const [last] = useState(10)
  const getTopStoryData = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const responseJson = await response.json()
    seTopStoryList([...responseJson])
  }

  useEffect(() => {
    getTopStoryData()
  }, [])

  const tenStory = topStoryList.slice(first, last)

  const storyList = []

  tenStory.forEach((id) => {
    storyList.push(
        <StoriesList storyId={id} key={id}/>
    )
  })

  return (
    <Container maxWidth="sm">
    <Stack spacing={2} sx={{ margin: '80px 0 20px' }}>
      {storyList}
    </Stack>
    </Container>
  )
}
