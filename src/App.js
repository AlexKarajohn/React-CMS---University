//NPM imports
import {Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Unauthorized from './components/unauthorized/Unauthorized';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Menu from './components/layout/menu/menu';

export const history = createBrowserHistory()

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  components:{
    MuiPaper:{
      styleOverrides:{
        outlined:{
          padding:20
        }
      }
    }
  }
});

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className="grid">
          <Menu />
          <Unauthorized />
        </div>
      </ThemeProvider>
    </Router>  
  );
}

export default App;
