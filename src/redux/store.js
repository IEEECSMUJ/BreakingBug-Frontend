import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

const store = configureStore({
    reducer:{                           //changed = to : 
        user: userReducer,
    }
});

export default store;