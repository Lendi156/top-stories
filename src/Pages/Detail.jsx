import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Stack, LinearProgress, Fab, Grid } from '@mui/material'
import CommentList from '../Component/CommentList'
import axios from 'axios'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { addTitle } from '../Redux/Reducers/addToFavorite'

const style = {
  contentContainer: {
    marginBottom: '24px'
  },
  fab: {
    position: 'fixed',
    right: '20vw',
    bottom: '5vh'
  },
  detailTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'center',
    margin: '48px 0 0'
  },
  detailComment: {
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'center'
  },
  detailWriter: {
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: 'Lato',
    textAlign: 'center'
  },
  detailDate: {
    fontSize: '0.64rem',
    textDecoration: 'none',
    textAlign: 'center'
  },
  detailCaption: {
    fontSize: '0.64rem',
    textDecoration: 'none',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '140%',
    fontWeight: '400'
  }
}

export default function Detail () {
  const story = useSelector((state) => state.storyId.id)
  const buttonSelector = useSelector((state) => state.favorite.favoriteId)
  const [storyData, setStoryData] = useState({})
  const [Progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const addToFavorite = (title) => {
    dispatch(addTitle(title))
  }
  const removeFavorite = () => {
    dispatch(addTitle({ title: '', id: 0 }))
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
    <>
      {loading ? <LinearProgress color="inherit" variant="determinate" value={Progress} /> : null }
          {buttonSelector === story
            ? (
                <Fab sx={style.fab} aria-label="remove from favorite" onClick={() => removeFavorite()}>
                  <StarIcon />
                </Fab>
              )
            : (
                <Fab sx={style.fab} aria-label="add to favorite" onClick={() => addToFavorite({ title: storyData.title, id: story })}>
                  <StarBorderIcon />
                </Fab>
              ) }
      <Container maxWidth="sm" sx={style.contentContainer}>
          <Stack spacing={2}>
            <Typography sx={style.detailTitle}>
                {storyData.title}
            </Typography>
            <Typography sx={style.detailWriter}>
                By: {storyData.by}
            </Typography>
            <Typography sx={style.detailDate}>
                {storyData.time}
            </Typography>
            <Grid container spacing={2} justifyContent="space-around">
              <Grid item >
                <Typography xs={4} sx={style.detailCaption}>
                  Type: {storyData.type}
                </Typography>
              </Grid>
              <Grid item>
                <Typography xs={4} sx={style.detailCaption}>
                  Score: {storyData.score}
                </Typography>
              </Grid>
              <Grid item>
                <Typography xs={4} sx={style.detailCaption}>
                  Descendents: {storyData.descendants}
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={style.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare ac eros ut feugiat. Praesent neque leo, mattis ac metus maximus, pharetra finibus tellus. Pellentesque porta nibh eget congue placerat. Aliquam cursus cursus porta. Morbi laoreet, orci et ultrices porttitor, lectus nisi molestie neque, nec egestas arcu justo ac mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean maximus aliquet orci, non viverra orci tempus vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio velit, sagittis ut viverra at, accumsan ac dolor. Nam sapien purus, tempor nec finibus in, dapibus sit amet risus. Pellentesque vitae fermentum ex, eget varius odio. Pellentesque laoreet velit rhoncus lacus auctor, vitae consectetur leo fermentum. Duis tellus nisl, volutpat sed rutrum in, convallis quis felis. Nunc varius, dui in interdum sollicitudin, urna felis commodo est, sed imperdiet nunc augue vitae massa. Ut quam orci, efficitur interdum gravida id, sollicitudin et dolor. Ut consequat purus ac congue sagittis. Donec facilisis, purus sed aliquam consequat, leo lectus tristique nisi, sed gravida purus sem ac sapien. Praesent sit amet lorem eleifend, elementum leo non, venenatis tellus. Suspendisse potenti. Ut aliquet in nulla quis vulputate. Donec accumsan pulvinar risus, sed dignissim massa ullamcorper vel. Suspendisse ullamcorper nec nulla ut facilisis. Etiam tincidunt magna vitae justo maximus, nec imperdiet leo vestibulum. Nullam elementum commodo lorem, non fermentum est volutpat in.
            </Typography>
            <Typography sx={style.detailComment}>
                Comments
            </Typography>
            {commentList}
          </Stack>
      </Container>
    </>
  )
}
