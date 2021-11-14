//NPM imports
import {Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Unauthorized from './components/unauthorized/Unauthorized';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from "react-redux";
import Menu from './components/layout/menu/menu';
import theme from './components/utils/ui/Theme'
import Authorized from "./components/authorized/Authorized";


function App() {
  const authorizationStatus = useSelector(state=>state.authorization.authorizationStatus)
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className="grid">
          <Menu />
          { !authorizationStatus ? <Unauthorized /> : <Authorized/>}
        </div>
      </ThemeProvider>
    </Router>  
  );
}

export default App;
export const history = createBrowserHistory()