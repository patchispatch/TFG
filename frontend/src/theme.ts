import { Theme, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

/**
 * App colors
 */
export enum Color {
  DEFAULT = 'default',
  LIGHT_BLUE = 'light_blue',
  DARK_BLUE = 'dark_blue',
  LIGHT_GREEN = 'light_green',
  DARK_GREEN = 'dark_green',
  LIGHT_PINK = 'light_pink',
  DARK_PINK = 'dark_pink',
  LIGHT_YELLOW = 'light_yellow',
  DARK_YELLOW = 'dark_yellow',
  LIGHT_PURPLE = 'light_purple',
  DARK_PURPLE = 'dark_purple'
}

export const defaultTheme = createMuiTheme({
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

const lightBlueTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#81d4fa',
      light: '#b6ffff',
      dark: '#4ba3c7',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffab91',
      light: '#ffddc1',
      dark: '#c97b63',
      contrastText: '#ffffff',
    },
  },
});

const darkBlueTheme = createMuiTheme({
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

const lightGreenTheme = createMuiTheme({
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

const darkGreenTheme = createMuiTheme({
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

const lightPinkTheme = createMuiTheme({
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

const darkPinkTheme = createMuiTheme({
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

const lightYellowTheme = createMuiTheme({
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

const darkYellowTheme = createMuiTheme({
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

const lightPurpleTheme = createMuiTheme({
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

const darkPurpleTheme = createMuiTheme({
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


/**
* Color data
*/
interface ColorData {
  sampleColor: string,
  theme: Theme
}

/**
* Category color data info for display
*/
export const ColorDataMap: {[color in Color]: ColorData} = {
  [Color.DEFAULT]: {sampleColor: '', theme: defaultTheme},
  [Color.LIGHT_BLUE]: {sampleColor: '', theme: lightBlueTheme},
  [Color.DARK_BLUE]: {sampleColor: '', theme: darkBlueTheme},
  [Color.LIGHT_GREEN]:{sampleColor: '', theme: lightGreenTheme},
  [Color.DARK_GREEN]: {sampleColor: '', theme: darkGreenTheme},
  [Color.LIGHT_PINK]: {sampleColor: '', theme: lightPinkTheme},
  [Color.DARK_PINK]: {sampleColor: '', theme: darkPinkTheme},
  [Color.LIGHT_YELLOW]: {sampleColor: '', theme: lightYellowTheme},
  [Color.DARK_YELLOW]: {sampleColor: '', theme: darkYellowTheme},
  [Color.LIGHT_PURPLE]: {sampleColor: '', theme: lightPurpleTheme},
  [Color.DARK_PURPLE]: {sampleColor: '', theme: darkPurpleTheme}
}
