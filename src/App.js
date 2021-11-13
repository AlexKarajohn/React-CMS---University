//NPM imports
import {Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Unauthorized from './components/unauthorized/Unauthorized';
import { ThemeProvider } from '@mui/material/styles';

import Menu from './components/layout/menu/menu';
import theme from './components/utils/ui/Theme'


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
export const history = createBrowserHistory()