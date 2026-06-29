import { StrictMode, useMemo, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme, ColorModeContext } from './theme.js'
import App from './App.jsx'

function getInitialMode() {
  const stored = localStorage.getItem('color-mode')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

/* eslint-disable react-refresh/only-export-components */
function Root() {
  const [mode, setMode] = useState(getInitialMode)

  const toggleColorMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('color-mode', next)
      return next
    })
  }, [])

  const colorMode = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode])
  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
