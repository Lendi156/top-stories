import React from 'react'
import './App.css'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

function App () {
  return (
    <Container>
      <AppBar sx={{ display: 'flex', alignItems: 'center' }}>
        <Toolbar sx={{ width: '600px', display: 'flex', justifyContent: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
              <AutoStoriesIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Top Stories
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default App
