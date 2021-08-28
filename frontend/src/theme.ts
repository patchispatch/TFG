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
      main: '#aed581',
      light: '#e1ffb1',
      dark: '#7da453',
      contrastText: '#000000',
    },
    secondary: {
      main: '#a1887f',
      light: '#d3b8ae',
      dark: '#725b53',
      contrastText: '#000000',
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
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f06292',
      light: '#ff94c2',
      dark: '#ba2d65',
      contrastText: '#000000',
    },
  },
});

const lightGreenTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#aed581',
      light: '#e1ffb1',
      dark: '#7da453',
      contrastText: '#000000',
    },
    secondary: {
      main: '#a1887f',
      light: '#d3b8ae',
      dark: '#725b53',
      contrastText: '#000000',
    },
  },
});

const darkGreenTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#81c784',
      light: '#b2fab4',
      dark: '#519657',
      contrastText: '#000000',
    },
    secondary: {
      main: '#795548',
      light: '#a98274',
      dark: '#4b2c20',
      contrastText: '#ffffff',
    },
  },
});

const lightPinkTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#f8bbd0',
      light: '#ffeeff',
      dark: '#c48b9f',
      contrastText: '#000000',
    },
    secondary: {
      main: '#80deea',
      light: '#b4ffff',
      dark: '#4bacb8',
      contrastText: '#ffffff',
    },
  },
});

const darkPinkTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#f06292',
      light: '#ff94c2',
      dark: '#ba2d65',
      contrastText: '#000000',
    },
    secondary: {
      main: '#42a5f5',
      light: '#80d6ff',
      dark: '#0077c2',
      contrastText: '#000000',
    },
  },
});

const lightYellowTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fff176',
      light: '#ffffa8',
      dark: '#cabf45',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39',
      contrastText: '#000000',
    },
  },
});

const darkYellowTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fdd835',
      light: '#ffff6b',
      dark: '#c6a700',
      contrastText: '#000000',
    },
    secondary: {
      main: '#4e342e',
      light: '#7b5e57',
      dark: '#260e04',
      contrastText: '#ffffff',
    },
  },
});

const lightPurpleTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#b39ddb',
      light: '#e6ceff',
      dark: '#836fa9',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f48fb1',
      light: '#ffc1e3',
      dark: '#bf5f82',
      contrastText: '#000000',
    },
  },
});

const darkPurpleTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7e57c2',
      light: '#b085f5',
      dark: '#4d2c91',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffd54f',
      light: '#ffff81',
      dark: '#c8a415',
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
