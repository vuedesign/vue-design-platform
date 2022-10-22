import { configureStore } from '@reduxjs/toolkit';
import { siteApi } from '@/globals/services/siteApi';
import { authApi } from '@/globals/services/authApi';
import { navigationApi } from '@/globals/services/navigationApi';
import { countApi } from '@/globals/services/countApi';
import { userApi } from '@/globals/services/userApi';
import { tagApi } from '@/globals/services/tagApi';
import { configureApi } from '@/globals/services/configureApi';
import authReducer from '@/globals/features/authSlice';
import siteReducer from '@/globals/features/siteSlice';
import globalReducer from '@/globals/features/globalSlice';
import pluginReducer from '@/globals/features/pluginSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [siteApi.reducerPath]: siteApi.reducer,
        [navigationApi.reducerPath]: navigationApi.reducer,
        [countApi.reducerPath]: countApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [tagApi.reducerPath]: tagApi.reducer,
        [configureApi.reducerPath]: configureApi.reducer,
        auth: authReducer,
        site: siteReducer,
        global: globalReducer,
        plugin: pluginReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            siteApi.middleware,
            authApi.middleware,
            navigationApi.middleware,
            countApi.middleware,
            userApi.middleware,
            tagApi.middleware,
            configureApi.middleware,
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
