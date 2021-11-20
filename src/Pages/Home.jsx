import React, { useState, useEffect } from 'react'
import { Container, Stack, Button, LinearProgress, Typography } from '@mui/material'
import StoriesList from '../Component/StoriesList'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Home () {
  const favoriteTitle = useSelector((state) => state.favorite.favorite)
  const [topStoryList, seTopStoryList] = useState([])
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(10)
  const [Progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  const getTopStoryData = async () => {
    try {
      const response = await axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
        {
          onDownloadProgress: async (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentage)
            if (percentage === 100) {
              setTimeout(() => {
                setLoading(false)
              }, 1000)
            }
          }
        }
      )
      const responseJson = await response.data
      seTopStoryList([...responseJson])
    } catch (err) {
      // Handle Error Here
      console.error(err)
    }
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
  const favoriteList = []

  tenStory.forEach((id) => {
    storyList.push(
        <StoriesList storyId={id} key={id}/>
    )
  })

  favoriteTitle.forEach((title) => {
    console.log(title)
    favoriteList.push(
      <Typography>
         {title}
      </Typography>
    )
  })

  return (
    <Container maxWidth="sm">
        <Stack spacing={2} sx={{ margin: '80px 0 20px' }}>
            {loading ? <LinearProgress variant="determinate" value={Progress} /> : null }
            {favoriteList}
            {storyList}
        </Stack>
        <Stack direction='row' justifyContent='flex-end' spacing={2}>
            {first === 0 ? null : <Button variant="contained" onClick={() => prevPage(first, last, setFirst, setLast)}>Previous</Button>}
            {last === topStoryList.length ? null : <Button variant="contained" onClick={() => nextPage(first, last, setFirst, setLast)}>Next</Button>}
        </Stack>
    </Container>
  )
}
