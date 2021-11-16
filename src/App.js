//NPM imports
import {Router} from "react-router-dom";
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@mui/material/styles';
import Menu from './components/layout/menu/menu';
import theme from './components/utils/ui/Theme'

import Routes from "./components/utils/Routes";

function App() {

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className="grid">
          <Menu />
            <Routes/>
        </div>
      </ThemeProvider>
    </Router>  
  );
}

export default App;
export const history = createBrowserHistory()


//change the routes to array + menu title 