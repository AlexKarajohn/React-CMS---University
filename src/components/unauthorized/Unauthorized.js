import { Switch, Route } from 'react-router-dom';
import Login from './login/Login'
import SignUp from './signup/SignUp'
import Home from './home/Home'

const Unauthorized = () => {
    return (
        <Switch> 
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/signup" component={SignUp} />
                <Route path="/auth/TermsAndConditions" component={Home} />
                <Route path='/' component={Home} />
        </Switch> 
    )
}
export default Unauthorized;