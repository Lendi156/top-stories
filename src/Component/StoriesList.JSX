import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, CardActionArea, Divider, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setId } from '../Redux/Reducers/setIdSlice'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import style from '../Style'

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
          <Card sx={style.card}>
            <CardActionArea sx={style.cardButton} onClick={() => saveIdToStorage(storyId)}>
              <CardContent>
                <Typography sx={style.cardTitle}>
                  {storyInfo.title}
                </Typography>
                <Divider sx={style.divider}/>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ChatBubbleOutlineIcon sx={style.icon} />
                    <Typography sx={style.cardCaption}>
                      {storyInfo.kids === undefined ? 0 : storyInfo.kids.length}
                    </Typography>
                  </Stack>
                  <Typography sx={style.cardCaption}>
                    Score: {storyInfo.score}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
  )
}

StoriesList.propTypes = {
  storyId: PropTypes.number.isRequired
}
