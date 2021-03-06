//NPM imports
import { history } from "./store/store";
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from '@mui/material/styles';
import Menu from './components/layout/menu/menu';
import theme from './components/utils/ui/Theme'
import Grid from '@mui/material/Grid'
import Routes from "./Routes";
import { SnackbarProvider } from 'notistack';
import DialogRedux from "./components/layout/dialog/DialogRedux";
import {useEffect } from 'react';
import socketIO from "./components/utils/socketIO";
import { useSelector } from "react-redux";
const App = () =>{
  const authorizationStatus = useSelector(state=>state.authorization.authorizationStatus)
  useEffect(()=>{
    if(authorizationStatus)
      socketIO.connect();
    return(()=>{
      socketIO.disconnect();
    })
  },[authorizationStatus])
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
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
        </SnackbarProvider>
        <DialogRedux/>
      </ThemeProvider>
    </ConnectedRouter>  
  );
}

export default App;

