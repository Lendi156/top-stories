import axios from 'axios'
import { addTitle } from './Redux/Reducers/addToFavorite'
import { setId } from './Redux/Reducers/setIdSlice'

export const getTopStoryData = async (setProgress, setLoading, setTopStoryList) => {
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
    setTopStoryList([...responseJson])
  } catch (err) {
    // Handle Error Here
    console.error(err)
  }
}

export const nextPage = (first, last, setFirst, setLast) => {
  setFirst(first + 10)
  setLast(last + 10)
}

export const prevPage = (first, last, setFirst, setLast) => {
  setFirst(first - 10)
  setLast(last - 10)
}

export const addToFavorite = (title, dispatch) => {
  dispatch(addTitle(title))
}

export const removeFavorite = (dispatch) => {
  dispatch(addTitle({ title: '', id: 0 }))
}

export const getStoryData = async (story, setProgress, setLoading, setStoryData) => {
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

export const getOneStoryData = async (storyId, setStoryInfo) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
  const responseJson = await response.json()
  setStoryInfo({ ...responseJson })
}

export const saveIdToStorage = async (id, dispatch, navigate) => {
  await dispatch(setId(id))
  navigate('/detail')
}

export const getCommentData = async (commentId, setCommentInfo) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
  const responseJson = await response.json()
  setCommentInfo({ ...responseJson })
}

export const backToHome = (navigate) => {
  navigate('/')
}
