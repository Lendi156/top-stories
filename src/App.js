import React from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Home from './Pages/Home'
import Detail from './Pages/Detail'

function App () {
  const location = useLocation()
  const pageType = location.pathname

  return (
    <Container>
      <AppBar sx={{ display: 'flex', alignItems: 'center' }}>
        <Toolbar sx={{ width: '600px', display: 'flex', justifyContent: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
              <AutoStoriesIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {pageType === '/detail' ? 'Storie Detail' : 'Top Stories' }
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/detail" element={<Detail />}/>
      </Routes>
    </Container>
  )
}

export default App
