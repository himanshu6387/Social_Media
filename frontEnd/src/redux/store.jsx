import {createSlice,configureStore} from '@reduxjs/toolkit'
const storedLoginStatus = JSON.parse(localStorage.getItem('isLogin')) || false

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLogin: storedLoginStatus
    },
    reducers:{
        login(state){    //login(State) with the help of this we can change the data which is in initial state
            state.isLogin= true  //means when login function called then it will true
            //Store login Status 
            localStorage.setItem('isLogin',JSON.stringify(true));
        },
        logout(state){  
            state.isLogin = false
            localStorage.removeItem('isLogin');
        }
    }
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer:authSlice.reducer
})