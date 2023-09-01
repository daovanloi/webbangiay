import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ICategory } from '../../types/category'
import { GetAllCategory } from '../../services/categories'
import { IProduct } from '../../types/product'

const intialState = {
    categories: [],
    isLoading: false
} as { categories: IProduct[], isLoading: boolean }

export const fetchcategories = createAsyncThunk(
    'categories/fetch',
    async (arg, thunkAPI) => {
        try {
            const {data} = await GetAllCategory()
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

// Slice
export const categorieSlice = createSlice({
    name: "categories",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
            state.categories = action.payload
        },
        startLoading: (state) => {
            state.isLoading = true
        },
        endLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchcategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchcategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false
        })
    }
})

export const { fetch, startLoading, endLoading } = categorieSlice.actions
export const categoriesReducer = categorieSlice.reducer
