import React, { useState, useEffect } from 'react'
import { Container, Stack, Button, LinearProgress, Typography, Grid, Card, CardContent, Divider } from '@mui/material'
import StoriesList from '../Component/StoriesList'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import style from '../Style'
import { getTopStoryData, nextPage, prevPage } from '../utils'

export default function Home () {
  const favoriteTitle = useSelector((state) => state.favorite.favorite)
  const favoriteId = useSelector((state) => state.favorite.favoriteId)
  const [topStoryList, setTopStoryList] = useState([])
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(10)
  const [Progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTopStoryData(setProgress, setLoading, setTopStoryList)
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
