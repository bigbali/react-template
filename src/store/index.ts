import { configureStore } from '@reduxjs/toolkit';
import { reducer as deviceReducer } from 'Store/device';

export const store = configureStore({
    reducer: {
        device: deviceReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // allow callbacks as payload
    })
});

export default store;

export type DISPATCH = typeof store.dispatch;
export type ROOTSTATE = ReturnType<typeof store.getState>;
