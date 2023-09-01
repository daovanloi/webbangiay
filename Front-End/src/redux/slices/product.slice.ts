import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GetAllProduct } from '../../services/product'
import { IProduct } from '../../types/product'


const intialState = {
    products: [],
    isLoading: false
} as { products: IProduct[], isLoading: boolean }

export const fetchproducts = createAsyncThunk(
    'product/fetch',
    async (arg, thunkAPI) => {
        try {
            const {data} = await GetAllProduct()
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

// Slice
export const Productslice = createSlice({
    name: "products",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
            state.products = action.payload
        },
        startLoading: (state) => {
            state.isLoading = true
        },
        endLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchproducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchproducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.isLoading = false
        })
    }
})

export const { fetch, startLoading, endLoading } = Productslice.actions
export const productsReducer = Productslice.reducer
