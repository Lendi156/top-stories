import React, { useState, useEffect } from 'react'
import { Container, Stack, Button } from '@mui/material'
import StoriesList from '../Component/StoriesList'

export default function Home () {
  const [topStoryList, seTopStoryList] = useState([])
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(10)
  const getTopStoryData = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const responseJson = await response.json()
    seTopStoryList([...responseJson])
  }

  const nextPage = (first, last) => {
    setFirst(first + 10)
    setLast(last + 10)
  }

  const prevPage = (first, last) => {
    setFirst(first - 10)
    setLast(last - 10)
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
    <Stack direction='row' justifyContent='flex-end' spacing={2}>
            {first === 0 ? null : <Button variant="contained" onClick={() => prevPage(first, last, setFirst, setLast)}>Previous</Button>}
            {last === topStoryList.length ? null : <Button variant="contained" onClick={() => nextPage(first, last, setFirst, setLast)}>Next</Button>}
          </Stack>
    </Container>
  )
}
