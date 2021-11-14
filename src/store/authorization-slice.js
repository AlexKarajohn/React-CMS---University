import { createSlice } from '@reduxjs/toolkit';
import graphqlFetch from '../assets/graphql/graphqlFetch'
const initialAuthorizationState = { 
    authorizationStatus: localStorage.getItem('token') ? true : false,
    operations:{
        login: {
            status:'',
            error:undefined,
        },
        signUp:{
            status:'',
            error:undefined
        },
        forgotPassword:{
            status:'',
            error:undefined
        },
        updatePassword:{
            status:'',
            error:undefined
        }
    }
}

//Slice Initialization
const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: initialAuthorizationState,
    reducers: {
        setAuthorizationStatus(state,action) {
            state.authorizationStatus = action.payload;
        },
        setOperations(state,action){
            const data = action.payload;
            state.operations[data.function] = {
                status : data.status || 'Missing Status',
                error : data.error || undefined
            }
        }

    }
});
export const authorizationActions = authorizationSlice.actions;


//Login Thunk
export const login = (email,password) =>{
    return (dispatch) => {
        dispatch(authorizationActions.setOperations({
            function: 'login',
            status: 'Pending'
            })
        )
        const graphqlQuery= {
            query: 
                `
                    query loginUser($userInput: loginInput!){
                        loginUser(userInput: $userInput){
                            token
                            user{
                                name
                                email
                                createdWith
                                information{
                                    language

                                }
                            }
                        }
                    }
            
            `,variables:{
                userInput:{
                    password,
                    email,
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then(result=>{
                if(result?.errors?.length > 0){
                    dispatch(authorizationActions.setOperations({
                        status:'Failed',
                        function:'login',
                        error:result.errors[0].message
                    }))
                    return;
                }
                dispatch(authorizationActions.setOperations({
                    status:'Success',
                    function:'login'
                }))
                dispatch(authorizationActions.setAuthorizationStatus(true))
            }).catch(err=>{
                dispatch(authorizationActions.setOperations({
                    status:'Failed',
                    function:'login',
                    error:'Something went wrong.'
                }))
            })
    }
}
//SignUp Thunk
export const signUp = (name,password,confirmPassword,email,serial) =>{
    return (dispatch) => {
        dispatch(authorizationActions.setOperations({
            function: 'signUp',
            status: 'Pending'
        }))
        const graphqlQuery= {
            query: `
                mutation signUpUser($userInput: signUpInput!){
                    signUpUser(userInput: $userInput)
                }
            
            `,variables:{
                userInput:{
                    password,
                    confirmPassword,
                    email,
                    createdWith: serial,
                }
            }
        }
        graphqlFetch(graphqlQuery)
            .then((res)=>{
                if(res?.errors){
                    dispatch(authorizationActions.setOperations({
                        function: 'signUp',
                        status: 'Failed',
                        error: res.errors[0].message
                    }))
                    return;
                }
                dispatch(authorizationActions.setOperations({
                    function: 'signUp',
                    status: 'Success',
                }))
            })
            .catch((err)=>{
                dispatch(authorizationActions.setOperations({
                    function: 'signUp',
                    status: 'Failed',
                    error: 'Something went wrong.'
                }))
            }) 
    }
}
export default authorizationSlice.reducer;