//NPM imports

import { history } from "./store/store";
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from '@mui/material/styles';
import Menu from './components/layout/menu/menu';
import theme from './components/utils/ui/Theme'
import Grid from '@mui/material/Grid'
import Routes from "./Routes";

function App() {

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <div className="grid">
          <Menu />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
          >
            <Routes/>
          </Grid>
        </div>
      </ThemeProvider>
    </ConnectedRouter>  
  );
}

export default App;



//change the routes to array + menu title 