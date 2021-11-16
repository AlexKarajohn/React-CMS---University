import { Switch, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import Login from './login/Login'
import SignUp from './signup/SignUp'
import Home from './home/Home'
import PasswordRecovery from './passwordRecovery/PasswordRecovery'
import passwordChange from './passwordChange/PasswordChange'
import AccountActivation from './signup/AccountActivation';
import TermsAndConditions from './termsAndConditions/TermsAndConditions'
const Unauthorized = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Switch> 
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/signup" component={SignUp} />
                    <Route path="/auth/accountActivation/:token" component={AccountActivation} />
                    <Route path="/auth/passwordRecovery" component={PasswordRecovery} />
                    <Route path="/auth/passwordChange/:resetToken" component={passwordChange} />
                    <Route path="/termsAndConditions" component={TermsAndConditions} />
                    <Route path='/' component={Home} />
            </Switch> 
        </Grid>
    )
}
export default Unauthorized;