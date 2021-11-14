import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Profile'))
    },[dispatch])
    return ( 
        <div>
            Profile
        </div>
    )
}
export default Profile;