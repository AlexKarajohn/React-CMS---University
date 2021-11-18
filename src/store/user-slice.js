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
                    triggered: true,
                    status: true,
                    sensors : [
                        {
                            _id: '1',
                            name: 'Sensor One',
                            description: 'the first one',
                            status: false,
                            triggerType: 'NC',
                            active: false,
                        },
                        {
                            _id: '2',
                            name: 'Sensor Two',
                            description: 'the second one',
                            status: true,
                            triggerType: 'NC',
                            active: false,
                        },
                        {
                            _id: '3',
                            name: 'Sensor Three',
                            description: 'the third one',
                            status: true,
                            triggerType: 'NO',
                            active: true,
                        },
                    ],
                    alerts: [
                        {
                            sensor : '1',
                            time : Date.now() - 1000,
                            acknowledged : false
                        },
                        {
                            sensor : '1',
                            time : Date.now() - 2000,
                            acknowledged : false
                        },
                        {
                            sensor : '2',
                            time : Date.now(),
                            acknowledged : true
                        },
                    ]
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