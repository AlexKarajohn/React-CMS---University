import Grid from '@mui/material/Grid';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import TermsAndConditions from '../unauthorized/termsAndConditions/TermsAndConditions'
import Profile from './profile/Profile';
import Facilities from './facilities/Facilities';

const Authorized = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Switch> 
                    <Route path='/auth/profile' component={Profile} />
                    <Route path='/auth/facilities' component={Facilities} />
                    <Route path='/auth/facilities/:facilityId' component={Facilities} />
                    <Route path="/termsAndConditions" component={TermsAndConditions} />
                    <Route path='/auth/dashboard' component={Dashboard} />
            </Switch> 
        </Grid>
    )
}
export default Authorized;