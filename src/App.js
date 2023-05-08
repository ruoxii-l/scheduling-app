import React from 'react'
import MasterBoard from './tumey'
import { ThemeProvider } from '@mui/material'
import themes from './themes'

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <MasterBoard />
    </ThemeProvider>
  )
}

export default App
