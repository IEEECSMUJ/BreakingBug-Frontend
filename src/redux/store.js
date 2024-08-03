import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

const store = configureStore({

 /// ------> 8TH BUG <-----//
 // FIX(REPLACE = FROM :) 

    reducer :{
        user: userReducer,
    }
});

export default store;