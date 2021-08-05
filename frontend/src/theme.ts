import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#66bb6a',
      light: '#98ee99',
      dark: '#338ae3',
      contrastText: '#000000',
    },
    secondary: {
      main: '#8d6e63',
      light: '#be9c91',
      dark: '#5f4339',
      contrastText: '#ffffff',
    },
  },
});