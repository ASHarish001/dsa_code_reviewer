import { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CodeIcon from '@mui/icons-material/Code'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import RateReviewIcon from '@mui/icons-material/RateReview'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { reviewSolution } from './services/groq'
import MarkdownView from './components/MarkdownView'
import { ColorModeContext } from './theme'

const LANGUAGES = [
  'Python',
  'Javascript',
  'Java',
  'C++',
  'C',
  'C#',
  'Golang',
  'Rust',
  'Typescript',
  'Kotlin',
]

function App() {
  const { mode, toggleColorMode } = useContext(ColorModeContext)
  const [problem, setProblem] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReview = async () => {
    setError('')
    if (!code.trim()) {
      setError('Please paste your solution code before requesting a review.')
      return
    }
    setLoading(true)
    setReview('')
    try {
      const result = await reviewSolution({ problem, code, language })
      setReview(result)
    } catch (err) {
      setError(err.message || 'Something went wrong while reviewing your code.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setProblem('')
    setCode('')
    setReview('')
    setError('')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="default"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(26,26,26,0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <CodeIcon sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            DSA Code Reviewer
          </Typography>
          <Chip
            icon={<AutoAwesomeIcon />}
            label="Powered by Groq"
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Review your DSA solutions instantly
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Paste a problem statement and your code to get correctness, complexity,
            and optimization feedback.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Input panel */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Problem Statement"
                  placeholder="e.g. Given an array of integers, return indices of the two numbers that add up to a target..."
                  multiline
                  minRows={4}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  fullWidth
                />

                <TextField
                  select
                  label="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{ maxWidth: 200 }}
                >
                  {LANGUAGES.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Your Solution"
                  placeholder="Paste your code here..."
                  multiline
                  minRows={12}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  fullWidth
                  slotProps={{
                    input: { sx: { fontFamily: 'monospace', fontSize: '0.85rem' } },
                  }}
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <RateReviewIcon />
                      )
                    }
                    onClick={handleReview}
                    disabled={loading}
                    sx={{ flexGrow: 1 }}
                  >
                    {loading ? 'Reviewing...' : 'Review Code'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<RestartAltIcon />}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Review panel */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, minHeight: 400, height: '100%' }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <AutoAwesomeIcon color="primary" />
                <Typography variant="h6">AI Review</Typography>
              </Stack>

              {loading && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    gap: 2,
                  }}
                >
                  <CircularProgress />
                  <Typography color="text.secondary">
                    Analyzing your solution...
                  </Typography>
                </Box>
              )}

              {!loading && !review && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    gap: 2,
                    color: 'text.secondary',
                  }}
                >
                  <RateReviewIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                  <Typography color="text.secondary" align="center">
                    Your review will appear here once you submit your code.
                  </Typography>
                </Box>
              )}

              {!loading && review && <MarkdownView>{review}</MarkdownView>}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App
