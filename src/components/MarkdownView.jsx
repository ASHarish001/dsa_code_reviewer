import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const components = {
  h1: ({ children }) => (
    <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 700 }}>
        {children}
      </Typography>
    </>
  ),
  h3: ({ children }) => (
    <Typography variant="subtitle1" sx={{ mt: 1.5, mb: 0.5, fontWeight: 600 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.7 }}>
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 1.5 }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 1.5 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ mb: 0.5, lineHeight: 1.7 }}>
      {children}
    </Typography>
  ),
  a: ({ children, href }) => (
    <Link href={href} target="_blank" rel="noopener" color="primary">
      {children}
    </Link>
  ),
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <Box
          component="code"
          sx={{
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 161, 22, 0.12)'
                : 'rgba(255, 161, 22, 0.18)',
            color: 'primary.main',
            fontFamily: 'monospace',
            fontSize: '0.85em',
          }}
        >
          {children}
        </Box>
      )
    }
    return (
      <Box
        component="pre"
        sx={{
          p: 2,
          my: 1.5,
          borderRadius: 2,
          overflowX: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? '#f5f6f8' : '#1a1a1a',
          border: '1px solid',
          borderColor: 'divider',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}
      >
        <code className={className}>{children}</code>
      </Box>
    )
  },
  strong: ({ children }) => (
    <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>
      {children}
    </Box>
  ),
}

export default function MarkdownView({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
