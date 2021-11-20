import React, { useState, useEffect } from 'react'
import { Container, Stack, Button, LinearProgress, Typography, Grid, Card, CardContent, Divider } from '@mui/material'
import StoriesList from '../Component/StoriesList'
import axios from 'axios'
import { useSelector } from 'react-redux'
import style from '../Style'

export default function Home () {
  const favoriteTitle = useSelector((state) => state.favorite.favorite)
  const favoriteId = useSelector((state) => state.favorite.favoriteId)
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
  // const favoriteList = []

  tenStory.forEach((id) => {
    storyList.push(
      <Grid item xs={6}>
        <StoriesList storyId={id} key={id}/>
      </Grid>
    )
  })

  return (
    <>
      {loading ? <LinearProgress color="inherit" variant="determinate" value={Progress} /> : null }
      <Container maxWidth="sm" sx={style.contentContainer}>
            {favoriteId
              ? (
              <Card sx={style.favoriteCard}>
                  <CardContent>
                    <Typography sx={style.favoriteCardTitle}>
                        {favoriteTitle}
                    </Typography>
                    <Divider sx={style.favoriteDivider}/>
                    <Typography sx={style.favoriteCardCaption}>
                        Your favorite story
                    </Typography>
                  </CardContent>
              </Card>
                )
              : null }

            <Grid container sx={style.storyListContainer} spacing={2}>
                {storyList}
            </Grid>
            <Stack container sx={style.buttonContainer} direction='row' justifyContent='flex-end' spacing={2}>
                {first === 0 ? null : <Button sx={style.button} variant="outlined" onClick={() => prevPage(first, last, setFirst, setLast)}>Previous</Button>}
                {last === topStoryList.length ? null : <Button sx={style.button} variant="outlined" onClick={() => nextPage(first, last, setFirst, setLast)}>Next</Button>}
            </Stack>
      </Container>
    </>
  )
}
