import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: green[500] }, // Purple and green play nicely together.
    
  },
});

function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
    </ThemeProvider>
  );
}

export default Palette;