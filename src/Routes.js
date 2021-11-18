import { Switch, Route } from 'react-router-dom';

import routes from './assets/routes/routes'
import { useSelector } from 'react-redux';
import {v4 as uuid} from 'uuid';
import Home from './components/unauthorized/home/Home';
import { useEffect , useState} from 'react';
const Routes = () => {

    const authorizationStatus = useSelector(state=> state.authorization.authorizationStatus)
    const [routesList, setRoutesList] = useState([])
    useEffect(()=>{
        const list = []
        Object.entries(routes).forEach(route=>{
            if(route[1].authorization === authorizationStatus)
            list.push(<Route exact={route[1].exact} key={uuid()} path={route[1].path} component={route[1].component} />)
        })
        setRoutesList(list);
    },[authorizationStatus])
    return (
        
            <Switch> 
                    {routesList}
                    <Route exact={false} key={uuid()} path='/' component={Home} />
            </Switch> 

    )
}
export default Routes;