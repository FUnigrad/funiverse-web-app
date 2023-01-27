import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[300],
      contrastText: '#fff',
    },
    background: {
      // default: red[500],
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  mixins: {
    toolbar: {
      height: 64,
    },
  },
});

export default theme;
