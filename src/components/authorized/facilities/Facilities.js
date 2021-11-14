import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";

const Facilities = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Facilities'))
    },[dispatch])
    return ( 
        <div>
            Facilities
        </div>
    )
}
export default Facilities;