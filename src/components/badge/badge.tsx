import Button from '@mui/material/Button'

export function Badge({ word, onClick }: any) {
  return (
    <Button
      onClick={() => onClick()}
      variant="contained"
      sx={{
        marginRight: '7px',
        marginBottom: '10px',
        padding: '3px 10px',
        borderRadius: '20px',
        color: 'white',
        backgroundColor: 'var(--light-gray-color)',
        '&:hover': {
          backgroundColor: 'var(--gray-color)',
        },
      }}
    >
      #{word}
    </Button>
  )
}
