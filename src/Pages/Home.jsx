import React from 'react'
import { Container, Stack } from '@mui/material'
import StoriesList from '../Component/StoriesList'

export default function Home () {
  const topStoryList = [1, 2, 3]
  const storyList = []

  topStoryList.forEach((id) => {
    storyList.push(
        <StoriesList storyId={id} />
    )
  })

  return (
    <Container maxWidth="sm">
    <Stack spacing={2} sx={{ margin: '80px 0 20px' }}>
      {storyList}
    </Stack>
    </Container>
  )
}
