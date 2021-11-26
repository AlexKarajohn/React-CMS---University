import { createSlice } from '@reduxjs/toolkit';
import graphqlFetch from '../assets/graphql/graphqlFetch';

const sensorOperations = {
    deleteSensor : {
        status : undefined,
        error : undefined,
    },
    updateSensor:{
        status : undefined,
        error : undefined,
    }
}
const alertOperations = {
    deleteAlert : {
        status : undefined,
        error : undefined,
    },
    acknowledgeAlert:{
        status : undefined,
        error : undefined,
    }
}


const initialUserState = {
    user: {
        email : 'placeholder@placeholder.gr',
        detailed: false,
        facilities : {
            items: [],
        },
        totalFacilities: 0,
        totalSensors: 0,
        totalAlerts: 0,
    },
    operations: {
        getUser:{
            status : undefined,
            error : undefined,
        },
        getFacility:{
            status : undefined,
            error : undefined,
        },
        addFacility:{
            status : undefined,
            error : undefined,
        },
        deleteFacility:{
            status : undefined,
            error : undefined,
        },
        updateFacility:{
            status : undefined,
            error : undefined,
        },
        addSensor:{
            status : undefined,
            error : undefined,
        }
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state,action){
            const facilitiesItems = action.payload.facilities.items.map(item=>{
                return {...item,detailed: false}
            })
            
            action.payload.facilities.items = facilitiesItems;
            state.user = {
                ...state.user,
                ...action.payload,
                detailed: true,
            }
            
        },
        setOperations(state,action){
            state.operations[action.payload.function] = {
                status : action.payload.status || '',
                error : action.payload.error || undefined
            };
        },
        setSensorOperations(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(item => item._id === action.payload.facilityId);
            const sensorIndex = state.user.facilities.items[facilityIndex].sensors.findIndex(item=>item._id === action.payload.sensorId)
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].operations[action.payload.function] = {
                status : action.payload.status || '',
                error : action.payload.error || undefined
            };
        },
        setAlertOperations(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(item => item._id === action.payload.facilityId);
            const sensorIndex = state.user.facilities.items[facilityIndex].sensors.findIndex(item=>item._id === action.payload.sensorId)
            const alertIndex = state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts.findIndex(item => item._id === action.payload.alertId)
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts[alertIndex].operations[action.payload.function] = {
                status : action.payload.status || '',
                error : action.payload.error || undefined
            };
        },
        setFacility(state,action){
            const index = state.user.facilities.items.findIndex(facility=>facility._id === action.payload._id) 
            const sensors = action.payload.sensors.map(item=>{
                const alerts = item.alerts.map(alert=>{
                    return {
                        ...alert,
                        operations: alertOperations
                    }
                })
                return {
                    ...item,
                    alerts,
                    operations : sensorOperations
                }
            })
            state.user.facilities.items[index] = {
                ...action.payload, 
                sensors,
                detailed: true
            }
        },
        addFacility(state,action){
            state.user.facilities.items.push(action.payload)
        },
        deleteFacility(state,action){
            state.user.facilities.items = state.user.facilities.items.filter(item=>item._id !== action.payload)
        },
        updateFacility(state,action){
            const index = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId) 
            state.user.facilities.items[index].name = action.payload.name
            state.user.facilities.items[index].description = action.payload.description
            state.user.facilities.items[index].enabled = action.payload.enabled
        },
        addSensor(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId) 
            state.user.facilities.items[facilityIndex].sensors.push({
                ...action.payload.sensor,
                operations : sensorOperations
            })
            console.log(action.payload.sensor)
        },
        deleteSensor(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId)
            state.user.facilities.items[facilityIndex].sensors = state.user.facilities.items[facilityIndex].sensors.filter(sensor=> sensor._id !== action.payload.sensorId);
        },
        updateSensor(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId)
            const sensorIndex = state.user.facilities.items[facilityIndex].sensors.findIndex(sensor=> sensor._id === action.payload.sensorId)
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].name = action.payload.name
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].description = action.payload.description
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].triggerType = action.payload.triggerType
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].pin = action.payload.pin
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].enabled = action.payload.enabled
        },
        acknowledgeAlert(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId)
            const sensorIndex = state.user.facilities.items[facilityIndex].sensors.findIndex(sensor=> sensor._id === action.payload.sensorId)
            const alertIndex = state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts.findIndex(alert=>alert._id === action.payload.alertId)
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts[alertIndex].acknowledged = true;
        },
        deleteAlert(state,action){
            const facilityIndex = state.user.facilities.items.findIndex(facility=>facility._id === action.payload.facilityId)
            const sensorIndex = state.user.facilities.items[facilityIndex].sensors.findIndex(sensor=> sensor._id === action.payload.sensorId)
            state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts = state.user.facilities.items[facilityIndex].sensors[sensorIndex].alerts.filter(alert=> alert._id !== action.payload.alertId)
        }
    }   
});
export const userActions = userSlice.actions;

export const getUser = () =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'getUser',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                query getUser{
                    getUser{
                        email
                        facilities{
                            items  {
                                _id
                                name
                                sensors{
                                    _id
                                    triggered
                                    alerts{
                                        _id
                                        acknowledged
                                    } 
                                }
                            }
                        }
                    }
                }
            `
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'getUser',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'getUser'
                }))

                dispatch(userActions.setUser(result.data.getUser))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'getUser',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const getFacility = (facilityId) =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'getFacility',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                query getFacility($facilityId : String!){
                    getFacility(facilityId : $facilityId){
                        _id
                        name
                        description
                        triggered
                        status
                        enabled
                        sensors{
                            _id
                            name
                            pin
                            description
                            triggered
                            enabled
                            triggerType
                            alerts{
                                _id
                                time
                                acknowledged
                            } 
                        } 
                    }
                }
            `,
            variables: {
                facilityId
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'getFacility',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'getFacility'
                }))
                dispatch(userActions.setFacility(result.data.getFacility))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'getFacility',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const addFacility = (name,description) =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'addFacility',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                mutation addFacility($userInput : addFacilityInput!){
                    addFacility(userInput : $userInput){
                                _id
                                name
                                sensors{
                                    _id
                                    alerts{
                                        _id
                                    } 
                                }
                    }
                }
            `,
            variables: {
                userInput : {
                    name,
                    description
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'addFacility',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'addFacility'
                }))
                dispatch(userActions.addFacility(result.data.addFacility))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'addFacility',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const deleteFacility = (facilityId) =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'deleteFacility',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                mutation deleteFacility($userInput : ID!){
                    deleteFacility(userInput : $userInput)
                }
            `,
            variables:{
                userInput : facilityId
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'deleteFacility',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'deleteFacility'
                }))
                dispatch(userActions.deleteFacility(facilityId))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'deleteFacility',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const updateFacility = (facilityId,name,description,enabled) =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'updateFacility',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                mutation updateFacility($userInput : updateFacilityInput!){
                    updateFacility(userInput : $userInput)
                }
            `,
            variables:{
                userInput : {facilityId,name,description,enabled}
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'updateFacility',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'updateFacility'
                }))
                dispatch(userActions.updateFacility({facilityId,name,description,enabled}))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'updateFacility',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const addSensor = (facilityId,name,description,sensorType,gpio) =>{
    return (dispatch ) => {
        dispatch(userActions.setOperations({
            function : 'addSensor',
            status:'Pending',
        }))
        const graphqlQuery = {
            query: ` 
                mutation addSensor($userInput : addSensorInput!){
                    addSensor(userInput : $userInput){
                        _id
                        name
                        description
                        triggerType
                        pin
                        enabled
                        alerts{
                            time
                            acknowledged
                        }
                    }
                }
            `,
            variables:{
                userInput : {
                    facilityId,
                    name,
                    description,
                    triggerType : sensorType,
                    pin : gpio}
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setOperations({
                        status:'Failed',
                        function:'addSensor',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setOperations({
                    status:'Success',
                    function:'addSensor'
                }))
                dispatch(userActions.addSensor({facilityId,sensor: result.data.addSensor}))
            }).catch(err=>{
                dispatch(userActions.setOperations({
                    status:'Failed',
                    function:'addSensor',
                    error:'Something went wrong.'
                }))
            })
    }
}
export const deleteSensor = (facilityId,sensorId) =>{
    return (dispatch ) => {
        dispatch(userActions.setSensorOperations({
            function : 'deleteSensor',
            status:'Pending',
            facilityId,
            sensorId,
        }))
        const graphqlQuery = {
            query: ` 
                mutation deleteSensor($userInput : deleteSensorInput!){
                    deleteSensor(userInput : $userInput)
                }
            `,
            variables:{
                userInput : {
                    facilityId,
                    sensorId
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setSensorOperations({
                        status:'Failed',
                        function:'deleteSensor',
                        facilityId,
                        sensorId,
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setSensorOperations({
                    status:'Success',
                    function:'deleteSensor',
                    facilityId,
                    sensorId,
                }))
            }).catch(err=>{
                dispatch(userActions.setSensorOperations({
                    status:'Failed',
                    function:'deleteSensor',
                    facilityId,
                    sensorId,
                    error:'Something went wrong.'
                }))
            })
    }
}
export const updateSensor = (facilityId,sensorId,name,description,triggerType,pin,enabled) =>{
    return (dispatch ) => {
        console.log(facilityId)
        console.log(sensorId)
        dispatch(userActions.setSensorOperations({
            function : 'updateSensor',
            status:'Pending',
            facilityId,
            sensorId,
        }))
        const graphqlQuery = {
            query: ` 
                mutation updateSensor($userInput : updateSensorInput!){
                    updateSensor(userInput : $userInput)
                }
            `,
            variables:{
                userInput : {
                    facilityId,
                    sensorId,
                    name,
                    description,
                    triggerType,
                    pin,
                    enabled
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setSensorOperations({
                        status:'Failed',
                        function:'updateSensor',
                        facilityId,
                        sensorId,
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setSensorOperations({
                    status:'Success',
                    function:'updateSensor',
                    facilityId,
                    sensorId,
                }))
                dispatch(userActions.updateSensor({
                    name,
                    description,
                    facilityId,
                    sensorId,
                    pin,
                    triggerType,
                    enabled
                }))
            }).catch(err=>{
                dispatch(userActions.setSensorOperations({
                    status:'Failed',
                    function:'updateSensor',
                    facilityId,
                    sensorId,
                    error:'Something went wrong.'
                }))
            })
    }
}
export const acknowledgeAlert = (facilityId,sensorId,alertId) =>{
    return (dispatch ) => {
        dispatch(userActions.setAlertOperations({
            function : 'acknowledgeAlert',
            status:'Pending',
            facilityId,
            sensorId,
            alertId,
        }))
        const graphqlQuery = {
            query: ` 
                mutation acknowledgeAlert($userInput : acknowledgeAlertInput!){
                    acknowledgeAlert(userInput : $userInput)
                }
            `,
            variables:{
                userInput : {
                    facilityId,
                    sensorId,
                    alertId,
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setAlertOperations({
                        status:'Failed',
                        function:'acknowledgeAlert',
                        facilityId,
                        sensorId,
                        alertId,
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setAlertOperations({
                    status:'Success',
                    function:'acknowledgeAlert',
                    facilityId,
                    sensorId,
                    alertId,
                }))
                dispatch(userActions.acknowledgeAlert({
                    facilityId,
                    sensorId,
                    alertId,
                }))
            }).catch(err=>{
                dispatch(userActions.setAlertOperations({
                    status:'Failed',
                    function:'acknowledgeAlert',
                    facilityId,
                    sensorId,
                    alertId,
                    error:'Something went wrong.'
                }))
            })
    }
}
export const deleteAlert = (facilityId,sensorId,alertId) =>{
    return (dispatch ) => {
        dispatch(userActions.setAlertOperations({
            function : 'deleteAlert',
            status:'Pending',
            facilityId,
            sensorId,
            alertId,
        }))
        const graphqlQuery = {
            query: ` 
                mutation deleteAlert($userInput : deleteAlertInput!){
                    deleteAlert(userInput : $userInput)
                }
            `,
            variables:{
                userInput : {
                    facilityId,
                    sensorId,
                    alertId,
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(userActions.setAlertOperations({
                        status:'Failed',
                        function:'deleteAlert',
                        facilityId,
                        sensorId,
                        alertId,
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(userActions.setAlertOperations({
                    status:'Success',
                    function:'deleteAlert',
                    facilityId,
                    sensorId,
                    alertId,
                }))
            }).catch(err=>{
                dispatch(userActions.setAlertOperations({
                    status:'Failed',
                    function:'deleteAlert',
                    facilityId,
                    sensorId,
                    alertId,
                    error:'Something went wrong.'
                }))
            })
    }
}

export default userSlice.reducer;



/*
const initialUserState = {
    user: {
        email : 'placeholder@placeholder.gr',
        facilities : {
            items: [
                {
                    _id: '1',
                    name:'Facility One',
                    description : 'The first one',
                    enabled : true,
                    triggered: true,
                    status: true,
                    sensors : [
                        {
                            _id: '1',
                            name: 'Sensor One',
                            pin : 3,
                            description: 'the first one',
                            triggered: false,
                            triggerType: 'NC',
                            enabled: true,
                            alerts:[
                                {
                                    _id:'1',
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    _id:'1',
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    _id:'1',
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    _id:'1',
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    _id:'1',
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                            ]
                        },
                        {
                            _id: '2',
                            name: 'Sensor Two',
                            pin : 2,
                            description: 'the second one',
                            triggered: true,
                            triggerType: 'NC',
                            enabled: false,
                            alerts:[
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                            ]
                        },
                        {
                            _id: '3',
                            name: 'Sensor Three',
                            pin : 4,
                            description: 'the third one',
                            triggered: true,
                            triggerType: 'NO',
                            enabled: true,
                            alerts:[
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: true,
                                },
                                {
                                    sensor : '1',
                                    time : Date.now(),
                                    acknowledged: false,
                                },
                            ]
                        },
                    ],
                }
            ],
            detailed: true
        },
        alerts: [],
        sensors : []
    },
    operations: {

    }
}
*/