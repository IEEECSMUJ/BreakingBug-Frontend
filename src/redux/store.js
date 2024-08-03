import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

const store = configureStore({
    reducer:{              //changed equal sign (=) to a colon (:) to define the user reducer
        user: userReducer,
    }
});

export default store;