import { createContext } from 'react'
import { createTheme } from '@mui/material/styles'

// LeetCode-inspired accent colors
const LC_ORANGE = '#ffa116' // signature LeetCode orange
const LC_GREEN = '#00b8a3' // "Easy" green / submit accent
const LC_RED = '#ef4743' // "Hard" red

// Context used by the AppBar toggle to flip between light and dark.
export const ColorModeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
})

const lightPalette = {
  mode: 'light',
  primary: { main: LC_ORANGE, contrastText: '#ffffff' },
  secondary: { main: LC_GREEN },
  error: { main: LC_RED },
  background: {
    default: '#f7f8fa',
    paper: '#ffffff',
  },
  text: {
    primary: '#262626',
    secondary: '#5c5c5c',
  },
  divider: 'rgba(0,0,0,0.1)',
}

const darkPalette = {
  mode: 'dark',
  primary: { main: LC_ORANGE, contrastText: '#1a1a1a' },
  secondary: { main: LC_GREEN },
  error: { main: LC_RED },
  background: {
    default: '#1a1a1a',
    paper: '#282828',
  },
  text: {
    primary: '#eff1f6',
    secondary: '#b3b3b3',
  },
  divider: 'rgba(255,255,255,0.1)',
}

export function createAppTheme(mode) {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            border:
              mode === 'light'
                ? '1px solid rgba(0,0,0,0.08)'
                : '1px solid rgba(255,255,255,0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
    },
  })
}

export default createAppTheme('dark')
