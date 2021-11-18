import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Home from './Pages/Home'

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
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </Container>
  )
}

export default App
