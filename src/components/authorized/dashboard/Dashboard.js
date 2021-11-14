import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Dashboard'))
    },[dispatch])
    return ( 
        <div>
            dashboard
        </div>
    )
}
export default Dashboard;