import React from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Home from './Pages/Home'
import Detail from './Pages/Detail'

const style = {
  body: {
    position: 'relative'
  },
  appBar: {
    boxShadow: 'none',
    position: 'static',
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottom: '2px solid black'
  },
  toolBar: {
    backgroundColor: 'white',
    padding: '0 64px',
    height: '88px',
    position: 'relative'
  },
  iconButton: {
    mr: 2,
    color: 'black'
  },
  menu: {
    display: 'block',
    color: 'black',
    fontSize: '2.441rem',
    fontFamily: 'Lato',
    fontWeight: '300',
    letterSpacing: '-0.065em'
  }
}

function App () {
  const location = useLocation()
  const pageType = location.pathname

  return (
    <Container sx={style.body}>
      <AppBar sx={style.appBar}>
        <Toolbar sx={style.toolBar}>
          <IconButton edge="start" aria-label="menu" sx={style.iconButton} >
              <AutoStoriesIcon />
          </IconButton>
          <Typography sx={style.menu} variant="h6" component="div">
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
