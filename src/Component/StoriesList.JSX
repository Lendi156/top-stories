import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, CardActionArea, Divider, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import style from '../Style'
import { getOneStoryData, saveIdToStorage } from '../utils'

export default function StoriesList ({ storyId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [storyInfo, setStoryInfo] = useState({})

  useEffect(() => {
    getOneStoryData(storyId, setStoryInfo)
  }, [])

  return (
          <Card sx={style.card}>
            <CardActionArea sx={style.cardButton} onClick={() => saveIdToStorage(storyId, dispatch, navigate)}>
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
