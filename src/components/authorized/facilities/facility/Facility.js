import { useSelector } from "react-redux";

const Facility = ({match,location}) => {
    const facility = useSelector(state=>state.user.user.facilities.items.find(facility=> facility.id === match.params.facilityId))
    console.log(facility)
    return (
        <div>
            Facility
        </div>
    )
}

export default Facility;