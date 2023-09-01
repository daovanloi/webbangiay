import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './slices/product.slice'
import { categoriesReducer } from './slices/categories.slice'

export const store = configureStore({
    reducer: {
        // auth:
        products:productsReducer,
        categories:categoriesReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch