import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    status: 'idle',
    loading: false,
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    currentToken: (JSON.parse(localStorage.getItem('user')) || {}).token || null,
    isLoggedIn: false,
    error: null,
    response: null,

    responseReview: null,
    responseProducts: null,
    responseSellerProducts: null,
    responseSpecificProducts: null,
    responseDetails: null,
    responseSearch: null,
    responseCustomersList: null,

    productData: [],
    sellerProductData: [],
    specificProductData: [],
    productDetails: {},
    productDetailsCart: {},
    filteredProducts: [],
    customersList: [],
};

const updateCartDetailsInLocalStorage = (cartDetails) => {
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    currentUser.cartDetails = cartDetails;
    localStorage.setItem('user', JSON.stringify(currentUser));
};

export const updateShippingDataInLocalStorage = (shippingData) => {
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    const updatedUser = {
        ...currentUser,
        shippingData: shippingData
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = 'loading';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        stuffAdded: (state) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
        },
        stuffUpdated: (state) => {
            state.status = 'updated';
            state.response = null;
            state.error = null;
        },
        updateFailed: (state, action) => {
            state.status = 'failed';
            state.responseReview = action.payload;
            state.error = null;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        authSuccess: (state, action) => {
            const { token, ...userData } = action.payload;

            // Check if the token is valid before setting state
            try {
                jwtDecode(token); // Validate the token
            } catch (error) {
                console.error('Invalid token during authSuccess:', error);
                state.status = 'failed';
                state.error = 'Invalid token';
                return;
            }

            localStorage.setItem('user', JSON.stringify({ ...userData, token }));
            state.currentUser = userData;
            state.currentRole = userData.role;
            state.currentToken = token;
            state.status = 'success';
            state.response = null;
            state.error = null;
            state.isLoggedIn = true;
        },

        addToCart: (state, action) => {
            const existingProduct = state.currentUser.cartDetails.find(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const newCartItem = { ...action.payload };
                state.currentUser.cartDetails.push({ ...existingProduct, newCartItem });
            }

            updateCartDetailsInLocalStorage(state.currentUser.cartDetails);
        },
        removeFromCart: (state, action) => {
            const index = state.currentUser.cartDetails.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (index !== -1) {
                if (state.currentUser.cartDetails[index].quantity > 1) {
                    state.currentUser.cartDetails[index].quantity -= 1;
                } else {
                    state.currentUser.cartDetails.splice(index, 1);
                }
            }

            updateCartDetailsInLocalStorage(state.currentUser.cartDetails);
        },

        removeSpecificProduct: (state, action) => {
            const productIdToRemove = action.payload;
            state.currentUser.cartDetails = state.currentUser.cartDetails.filter(
                (cartItem) => cartItem._id !== productIdToRemove

            );
            updateCartDetailsInLocalStorage(state.currentUser.cartDetails)
        },


        fetchProductDetailsFromCart: (state, action) => {
            const productIdToFetch = action.payload._id;
            const productInCart = state.currentUser.cartDetails.find(
                (cartItem) => cartItem._id === productIdToFetch
            );

            if (productInCart) {
                state.productDetailsCart = { ...productInCart };
            } else {
                state.productDetailsCart = null;
            }
            return productInCart;
        },

        removeAllFromCart: (state) => {
            state.currentUser.cartDetails = [];
            updateCartDetailsInLocalStorage([]);
        },

        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
            state.error = null;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.response = null;
            state.error = action.payload;
        },
        authLogout: (state) => {
            localStorage.removeItem('user');
            state.status = 'idle';
            state.loading = false;
            state.currentUser = null;
            state.currentRole = null;
            state.currentToken = null;
            state.error = null;
            state.response = true;
            state.isLoggedIn = false;
        },

        isTokenValid: (state) => {
            if (state.currentToken) {
                try {
                    const decodedToken = jwtDecode(state.currentToken);
                    // You might want to check the token's expiration or other properties here
                    state.isLoggedIn = true;
                } catch (error) {
                    console.error('Invalid token:', error);
                    // Clear user data if the token is invalid
                    localStorage.removeItem('user');
                    state.currentUser = null;
                    state.currentRole = null;
                    state.currentToken = null;
                    state.status = 'idle';
                    state.response = null;
                    state.error = 'Invalid token';
                    state.isLoggedIn = false;
                }
            } else {
                localStorage.removeItem('user');
                state.currentUser = null;
                state.currentRole = null;
                state.currentToken = null;
                state.status = 'idle';
                state.response = null;
                state.error = 'No token found';
                state.isLoggedIn = false;
            }
        },

        getRequest: (state) => {
            state.loading = true;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getDeleteSuccess: (state) => {
            state.status = 'deleted';
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        productSuccess: (state, action) => {
            state.productData = action.payload;
            state.responseProducts = null;
            state.loading = false;
            state.error = null;
        },
        getProductsFailed: (state, action) => {
            state.responseProducts = action.payload;
            state.loading = false;
            state.error = null;
        },

        sellerProductSuccess: (state, action) => {
            state.sellerProductData = action.payload;
            state.responseSellerProducts = null;
            state.loading = false;
            state.error = null;
        },
        getSellerProductsFailed: (state, action) => {
            state.responseSellerProducts = action.payload;
            state.loading = false;
            state.error = null;
        },

        specificProductSuccess: (state, action) => {
            state.specificProductData = action.payload;
            state.responseSpecificProducts = null;
            state.loading = false;
            state.error = null;
        },
        getSpecificProductsFailed: (state, action) => {
            state.responseSpecificProducts = action.payload;
            state.loading = false;
            state.error = null;
        },

        productDetailsSuccess: (state, action) => {
            state.productDetails = action.payload;
            state.responseDetails = null;
            state.loading = false;
            state.error = null;
        },
        getProductDetailsFailed: (state, action) => {
            state.responseDetails = action.payload;
            state.loading = false;
            state.error = null;
        },

        customersListSuccess: (state, action) => {
            state.customersList = action.payload;
            state.responseCustomersList = null;
            state.loading = false;
            state.error = null;
        },

        getCustomersListFailed: (state, action) => {
            state.responseCustomersList = action.payload;
            state.loading = false;
            state.error = null;
        },

        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
            state.responseSearch = null;
            state.loading = false;
            state.error = null;
        },
        getSearchFailed: (state, action) => {
            state.responseSearch = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    authRequest,
    underControl,
    stuffAdded,
    stuffUpdated,
    updateFailed,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    isTokenValid,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    productSuccess,
    sellerProductSuccess,
    productDetailsSuccess,
    getProductsFailed,
    getSellerProductsFailed,
    getProductDetailsFailed,
    getFailed,
    getError,
    getSearchFailed,
    customersListSuccess,
    getSpecificProductsFailed,
    specificProductSuccess,
    addToCart,
    removeFromCart,
    removeSpecificProduct,
    removeAllFromCart,
    fetchProductDetailsFromCart,
    updateCurrentUser,
    setFilteredProducts,
    getCustomersListFailed
} = userSlice.actions;

export const userReducer = userSlice.reducer;
