import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Home from './Pages/Home'
import Detail from './Pages/Detail'
import style from './Style'

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
