import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material'

export default function StoriesList ({ storyId }) {
  return (
          <Card key={storyId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography>
                Judul
              </Typography>
              <Typography>
                Total Komentar
              </Typography>
              <Typography>
                Score
              </Typography>
            </CardContent>
            <CardActions>
                <Button> Details</Button>
            </CardActions>
          </Card>
  )
}

StoriesList.propTypes = {
  storyId: PropTypes.string.isRequired
}
