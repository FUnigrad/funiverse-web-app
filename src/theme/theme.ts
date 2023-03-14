import { green } from '@mui/material/colors';
import { createTheme, alpha } from '@mui/material/styles';

import type { LinkProps } from '@mui/material/Link';
import LinkBehaviour from 'components/LinkBehaviour';
const themeColors = {
  primary: '#5569ff',
  secondary: '#6E759F',
  success: '#57CA22',
  warning: '#FFA319',
  error: '#FF1943',
  info: '#33C2FF',
  black: '#000',
  white: '#ffffff',
  primaryAlt: '#000C57',
};
export const colors = {
  alpha: {
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
};
const theme = createTheme({
  palette: {
    primary: {
      main: green[300],
      contrastText: '#fff',
      light: '#fff',
    },
    background: {
      // default: red[500],
    },
  },
  typography: {
    fontFamily: 'inherit',
    button: {
      textTransform: 'none',
    },
  },
  mixins: {
    toolbar: {
      height: 64,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // text: {
        //   color: 'gray',
        //   ':hover': {
        //     backgroundColor: grey[100],
        //   },
        // },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          lineHeight: '40px',
          fontSize: 24,
          background: colors.alpha.black[5],
          color: colors.alpha.black[100],
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      } as LinkProps,
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          height: '40px',
          '& .MuiButtonBase-root': {
            minHeight: '40px',
            height: '40px',
            boxSizing: 'border-box',
          },
        },
      },
    },
    // MuiLink: {
    //   defaultProps: {
    //     // component: LinkBehaviour,
    //   },
    // },
    // MuiButtonBase: {
    //   defaultProps: {
    //     LinkComponent: NextLink,
    //   },
    // },
  },
});

export default theme;
