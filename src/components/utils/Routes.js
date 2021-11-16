import { Switch, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import routes from '../../assets/routes'
import { useSelector } from 'react-redux';
import {v4 as uuid} from 'uuid';
const Routes = () => {
    const authorizationStatus = useSelector(state=> state.authorization.authorizationStatus)
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Switch> 
                    {routes.filter(route=> (authorizationStatus===route.authorization || route.universal)).map(route=>{
                        return <Route exact key={uuid()} path={route.path} component={route.component} />
                    })}
            </Switch> 
        </Grid>
    )
}
export default Routes;