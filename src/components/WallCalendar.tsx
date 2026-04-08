// src/components/WallCalendar.tsx
import { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, TextField, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ImageIcon from '@mui/icons-material/Image';
import ReplayIcon from '@mui/icons-material/Replay';
import { useCalendar } from '../hooks/useCalendar';

const themes = [
  {
    name: "Glacier Peak",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000&auto=format&fit=crop",
    mainColor: "#0288d1", 
    lightColor: "#b3e5fc",
    panelBg: "#f0f8fd", 
    textColor: "#013a59", 
  },
  {
    name: "Deep Forest",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1000&auto=format&fit=crop",
    mainColor: "#2e7d32", 
    lightColor: "#c8e6c9",
    panelBg: "#f2fcf4", 
    textColor: "#103313", 
  },
  {
    name: "Canyon Sunset",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1000&auto=format&fit=crop",
    mainColor: "#d84315", 
    lightColor: "#ffccbc",
    panelBg: "#fef6f4", 
    textColor: "#591c09", 
  }
];

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
};

export default function WallCalendar() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const { 
    currentDate, startDate, endDate, direction, 
    daysInMonth, emptyCells, 
    handleDateClick, getDayStatus, navigateMonth, navigateYear 
  } = useCalendar();

  const [notes, setNotes] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);
  const activeTheme = themes[themeIndex];

  useEffect(() => {
    const savedNotes = localStorage.getItem("mui_calendar_notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("mui_calendar_notes", notes);
  }, [notes]);

  const handleKeyDown = (e: React.KeyboardEvent, day: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDateClick(day);
    }
  };

  return (
    <>
      <Box sx={{ position: 'fixed', top: -50, bottom: -50, left: -50, right: -50, backgroundImage: `url(${activeTheme.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(40px)', transform: 'scale(1.1)', zIndex: -2, transition: 'background-image 0.7s ease' }} />
      <Box sx={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.55)', zIndex: -1 }} />

      <Paper 
        elevation={24} 
        sx={{ 
          width: '100%', maxWidth: 1200, height: '100%', maxHeight: 800, display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderRadius: { xs: 0, md: 4 }, 
          overflowX: 'hidden', overflowY: { xs: 'auto', md: 'hidden' }, // Locks desktop scrolling globally
          transition: 'background-color 0.5s ease', border: '1px solid rgba(255,255,255,0.4)' 
        }}
      >
        {/* LEFT PANEL */}
        <Box sx={{ width: isMobile ? '100%' : '35%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', flexShrink: 0 }}>
          <Box sx={{ position: 'relative', height: isMobile ? 300 : '45%', overflow: 'hidden' }}>
            <Box component="img" src={activeTheme.image} alt="Theme Landscape" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', '&:hover': { transform: 'scale(1.08)' } }} />
            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${activeTheme.mainColor} 0%, transparent 100%)`, opacity: 0.85, transition: 'background 0.5s ease' }} />
            <Box sx={{ position: 'absolute', bottom: { xs: 20, md: 30 }, left: { xs: 20, md: 30 }, color: 'white' }}>
              <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, mb: -0.5, fontSize: { xs: '2rem', md: '3rem' } }}>
                {currentDate.toLocaleString('default', { month: 'long' })}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, opacity: 0.9, letterSpacing: 1, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {currentDate.getFullYear()}
              </Typography>
            </Box>
            <IconButton aria-label="Change visual theme" onClick={() => setThemeIndex((prev) => (prev + 1) % themes.length)} sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } }}>
              <ImageIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column', borderRight: isMobile ? 'none' : '1px solid rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" id="notes-label" sx={{ fontWeight: 800, color: activeTheme.textColor, opacity: 0.7, letterSpacing: 2 }}>Monthly Notes</Typography>
              <IconButton size="small" aria-label="Clear notes" onClick={() => setNotes("")}>
                <ReplayIcon fontSize="small" sx={{ color: activeTheme.textColor, opacity: 0.5 }}/>
              </IconButton>
            </Box>
            <TextField
              multiline fullWidth variant="standard" placeholder="Jot down your memos..." value={notes} onChange={(e) => setNotes(e.target.value)}
              sx={{ flexGrow: 1, overflowY: 'auto' }}
              slotProps={{ 
                htmlInput: { 'aria-labelledby': 'notes-label' },
                input: { disableUnderline: true, sx: { lineHeight: '2.5rem', height: '100%', alignItems: 'flex-start', color: activeTheme.textColor, backgroundImage: `repeating-linear-gradient(transparent, transparent 39px, ${activeTheme.mainColor}20 39px, ${activeTheme.mainColor}20 40px)`, backgroundAttachment: 'local', transition: 'color 0.5s ease' } } 
              }}
            />
          </Box>
        </Box>

        {/* RIGHT PANEL */}
        {/* TIGHTENED PADDING for laptop view (md: 4 instead of md: 6) */}
        <Box sx={{ width: isMobile ? '100%' : '65%', p: { xs: 3, md: 4, lg: 6 }, display: 'flex', flexDirection: 'column', backgroundColor: activeTheme.panelBg, transition: 'background-color 0.5s ease', overflowX: 'hidden' }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 4 }, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
              <IconButton aria-label="Previous year" onClick={() => navigateYear(-1)} sx={{ bgcolor: 'white', color: activeTheme.mainColor, boxShadow: 1, p: { xs: 0.5, md: 1 } }}>
                <KeyboardDoubleArrowLeftIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton aria-label="Previous month" onClick={() => navigateMonth(-1)} sx={{ bgcolor: 'white', color: activeTheme.mainColor, boxShadow: 1, p: { xs: 0.5, md: 1 } }}>
                <ChevronLeftIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Box>

            <Typography aria-live="polite" sx={{ fontWeight: 800, color: activeTheme.mainColor, letterSpacing: -0.5, transition: 'color 0.5s ease', fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' }, textAlign: 'center', px: 1 }}>
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>

            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
              <IconButton aria-label="Next month" onClick={() => navigateMonth(1)} sx={{ bgcolor: 'white', color: activeTheme.mainColor, boxShadow: 1, p: { xs: 0.5, md: 1 } }}>
                <ChevronRightIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton aria-label="Next year" onClick={() => navigateYear(1)} sx={{ bgcolor: 'white', color: activeTheme.mainColor, boxShadow: 1, p: { xs: 0.5, md: 1 } }}>
                <KeyboardDoubleArrowRightIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: { xs: 1, md: 2 }, textAlign: 'center' }}>
              {DAYS_OF_WEEK.map((day, i) => (
                <Typography key={day} variant="subtitle2" aria-hidden="true" sx={{ fontWeight: 800, color: i > 4 ? activeTheme.mainColor : activeTheme.textColor, opacity: i > 4 ? 1 : 0.6, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                  {day}
                </Typography>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, position: 'relative', overflowX: 'hidden' }}>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentDate.getTime()}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  // TIGHTENED GAP for laptop view
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', height: '100%', gap: isMobile ? 4 : 8 }}
                >
                  {[...Array(emptyCells)].map((_, i) => <Box key={`empty-${i}`} />)}
                  
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const status = getDayStatus(day);
                    let bg = 'transparent'; let color = activeTheme.textColor; let borderRadius = '50%'; let isBold = false;

                    if (status === 'start' || status === 'end') { bg = activeTheme.mainColor; color = 'white'; isBold = true; } 
                    else if (status === 'between') { bg = activeTheme.lightColor; color = activeTheme.textColor; borderRadius = '8px'; }

                    return (
                      <Box key={day} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {status === 'start' && endDate && <Box sx={{ position: 'absolute', right: 0, width: '50%', height: '80%', bgcolor: activeTheme.lightColor, zIndex: 0 }} />}
                        {status === 'end' && startDate && <Box sx={{ position: 'absolute', left: 0, width: '50%', height: '80%', bgcolor: activeTheme.lightColor, zIndex: 0 }} />}
                        
                        <Box
                          role="button"
                          tabIndex={0}
                          aria-label={`${day} ${currentDate.toLocaleString('default', { month: 'long' })}`}
                          aria-pressed={status !== null}
                          onClick={() => handleDateClick(day)}
                          onKeyDown={(e) => handleKeyDown(e, day)}
                          sx={{
                            // SCALED DOWN SIZES for laptop (md: 42)
                            position: 'relative', zIndex: 1, width: { xs: 32, sm: 40, md: 42, lg: 52 }, height: { xs: 32, sm: 40, md: 42, lg: 52 },
                            display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius,
                            backgroundColor: bg, color: color, fontWeight: isBold ? 800 : 500, fontSize: { xs: '0.85rem', md: '1rem' },
                            cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: (status === 'start' || status === 'end') ? `0 4px 12px ${activeTheme.mainColor}60` : 0,
                            '&:hover, &:focus-visible': { backgroundColor: (status === 'start' || status === 'end') ? activeTheme.mainColor : 'rgba(255,255,255,0.8)', transform: (status === 'start' || status === 'end') ? 'scale(1.1)' : 'scale(1)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', outline: 'none', ring: '2px solid', ringColor: activeTheme.mainColor }
                          }}
                        >
                          {day}
                        </Box>
                      </Box>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}