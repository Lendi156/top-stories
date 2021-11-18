import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardContent, Button, Typography, CardActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setId } from '../Redux/Reducers/setIdSlice'

export default function StoriesList ({ storyId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [storyInfo, setStoryInfo] = useState({})
  const getStoryData = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
    const responseJson = await response.json()
    setStoryInfo({ ...responseJson })
  }

  const saveIdToStorage = async (id) => {
    await dispatch(setId(id))
    navigate('/detail')
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
                <Button onClick={() => saveIdToStorage(storyId)}> Details</Button>
            </CardActions>
          </Card>
  )
}

StoriesList.propTypes = {
  storyId: PropTypes.number.isRequired
}
