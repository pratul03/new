import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { GppGood, Emergency, Lightbulb } from '@mui/icons-material';

const InspectionLogo = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      border: '2px solid #1976d2',
      borderRadius: 2,
      maxWidth: 350,
      margin: '0 auto',
      backgroundColor: '#f5f9ff'
    }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <GppGood color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          lineHeight: 1
        }}>
          ST&
        </Typography>
      </Stack>
      
      <Divider sx={{ width: '100%', my: 2 }} />
      
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center'
      }}>
        Statutory Testing & Inspection
      </Typography>
      
      <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
        <Emergency color="warning" />
        <Lightbulb color="warning" />
        <Typography variant="subtitle1" sx={{ 
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          Emergency Lighting Inspection & Test Certificate
        </Typography>
      </Stack>
    </Box>
  );
};

export default InspectionLogo;