import { createSlice } from '@reduxjs/toolkit';
import graphqlFetch from '../assets/graphql/graphqlFetch';
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
            let totalAlerts = 0;
            let totalSensors = 0;
            if(action.payload.facilities.items.length>0){
                action.payload.facilities.items.forEach(facility=>{
                    if(facility.sensors.length > 0){
                        facility.sensors.forEach(sensor=>{
                            totalSensors++;
                            sensor.alerts.forEach(alert=>{
                                totalAlerts++;
                            })
                        })
                    }
                })
            }
            state.user.totalFacilities = action.payload.facilities.items.length;
            state.user.totalSensors = totalSensors;
            state.user.totalAlerts = totalAlerts;
        },
        setOperations(state,action){
            state.operations[action.payload.function] = {
                status : action.payload.status || '',
                error : action.payload.error || undefined
            };
        },
        setFacility(state,action){
            const index = state.user.facilities.items.findIndex(facility=>facility._id === action.payload._id) 
            console.log(index);
            state.user.facilities.items[index] = {...action.payload, detailed: true}
        },
        addFacility(state,action){
            state.user.facilities.items.push(action.payload)
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
                console.log(result.data.getUser)
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