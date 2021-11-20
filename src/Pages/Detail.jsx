import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Stack, LinearProgress, IconButton } from '@mui/material'
import CommentList from '../Component/CommentList'
import axios from 'axios'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { addTitle } from '../Redux/Reducers/addToFavorite'

export default function Detail () {
  const story = useSelector((state) => state.storyId.id)
  const [storyData, setStoryData] = useState({})
  const [Progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const addToFavorite = (title) => {
    dispatch(addTitle(title))
  }

  const getStoryData = async () => {
    try {
      const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`,
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
      setStoryData({ ...responseJson })
    } catch (err) {
      // Handle Error Here
      console.error(err)
    }
  }

  useEffect(() => {
    getStoryData()
  }, [])

  const commentList = []

  if (storyData.kids === undefined) {
    commentList.push(null)
  } else {
    storyData.kids.forEach((id) => {
      commentList.push(
          <CommentList commentId={id} key={id}/>
      )
    })
  }

  return (
    <Container maxWidth="sm">
        <Stack spacing={2} sx={{ margin: '80px 0 20px' }}>
        {loading ? <LinearProgress variant="determinate" value={Progress} /> : null }
        <IconButton aria-label="favorite" onClick={() => addToFavorite([storyData.title])}>
          <StarBorderIcon />
        </IconButton>
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
          {commentList}
        </Stack>
    </Container>
  )
}
