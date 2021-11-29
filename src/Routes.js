import { Switch, Route } from 'react-router-dom';

import routes from './assets/routes/routes'
import { useSelector,useDispatch } from 'react-redux';
import {v4 as uuid} from 'uuid';
import Home from './components/unauthorized/home/Home';
import { useEffect , useState} from 'react';
import { getUser } from './store/user-slice';


const Routes = () => {
    const dispatch = useDispatch();
    const authorizationStatus = useSelector(state=> state.authorization.authorizationStatus)

    useEffect(()=>{
        if(authorizationStatus)
        {
            dispatch(getUser())
        }
    },[authorizationStatus,dispatch])
   
    const [routesList, setRoutesList] = useState([])
    useEffect(()=>{
        const list = []
        Object.entries(routes).forEach(route=>{
            if(route[1].authorization === authorizationStatus || route[1].universal === true )
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