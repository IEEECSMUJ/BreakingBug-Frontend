import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

const store = configureStore({
    // : is used instead "="
    reducer:{                           
        user: userReducer,
    }
});

export default store;