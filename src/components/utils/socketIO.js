import {io} from 'socket.io-client'
import global_vars from '../../assets/global_vars';
import {importedStore} from '../../index'
import { userActions } from '../../store/user-slice';
let socket;
const socketIO = {
    connect: ()=>{
        socket = io(global_vars.socketUrl,{
    
            auth: {
                token : localStorage.getItem('token')
            },
            secure:true
        });
        socket.on("connect", () => {
            console.log('SocketIO: Connected')
    
        });
        socket.on("disconnect", (reason) => {
            if(reason === 'io server disconnect'){
                socket.connect();
            }
        });
        socket.on('addAlert',(data)=>{
            importedStore.dispatch(userActions.addAlert(data))
        })
        socket.on('triggeredSensor',(data)=>{
            importedStore.dispatch(
                userActions.triggeredSensor({
                    facilityId:data.facilityId,
                    sensorId:data.sensorId,
                    value : data.value
                }))
        })
        socket.on('facilityStatus',(data)=>{
            importedStore.dispatch(
                userActions.facilityStatus({
                    facilityId: data.facilityId,
                    value : data.value
                }))
        })
    },   
    disconnect: ()=>{
        socket.offAny();
        socket.disconnect();
    }
}

export default socketIO;


//make it classlike object with constructor & destructor
    // socket.on('addFacility',(data)=>{
    //     importedStore.dispatch(userActions.addFacility(data._doc))
    // })
    // socket.on('deleteFacility',(data)=>{
    //     importedStore.dispatch(userActions.deleteFacility(data))
    // })
    // socket.on('updateFacility',(data)=>{
    //     importedStore.dispatch(userActions.updateFacility(data))
    // })
    // socket.on('addSensor',(data)=>{
    //     importedStore.dispatch(userActions.addSensor({facilityId: data.facilityId,sensor: data.sensor}))
    // })
    // socket.on('deleteSensor',(data)=>{
    //     importedStore.dispatch(userActions.setSensorOperations({
    //         status:'Success',
    //         function:'deleteSensor',
    //         facilityId: data.facilityId,
    //         sensorId: data.sensorId,
    //     }))
    // })