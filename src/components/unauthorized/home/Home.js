import { useEffect } from "react";
import { history } from "../../../App";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Home'))
        history.push('/');
    },[dispatch])
    return (
        <div>
            Home
        </div>
    )
}
export default Home;