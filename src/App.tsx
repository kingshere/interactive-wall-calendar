import { Box, CssBaseline } from '@mui/material';
import WallCalendar from './components/WallCalendar';

function App() {
  return (
    <>
      <CssBaseline /> 
      <Box 
        sx={{ 
          height: '100vh', 
          width: '100%',             // FIX: Changed from 100vw to 100%
          boxSizing: 'border-box',   // FIX: Prevents padding from adding to the total width
          backgroundColor: '#eef2f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',        // Locks the screen from scrolling
          p: { xs: 0, md: 4 } 
        }}
      >
        <WallCalendar />
      </Box>
    </>
  );
}

export default App;