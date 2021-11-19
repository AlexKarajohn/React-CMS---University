import { createSlice } from '@reduxjs/toolkit';

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
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state,payload){
            state.user = payload
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;