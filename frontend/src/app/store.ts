import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import {usersReducer} from "../features/users/usersSlice.ts";
import {occasionReducer} from "../features/occasion/occasionSlice.ts";


const usersPersistConfig = {
    key: 'planner:users',
    storage: storage,
    whitelist: ['users'],
};

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    occasion: occasionReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;