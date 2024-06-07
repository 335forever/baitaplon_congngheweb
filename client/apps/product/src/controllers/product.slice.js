import {createSlice} from '@reduxjs/toolkit'
import * as productRawReducer from './product.reducer'

const productSlice = createSlice({
    name: 'productColor',
    initialState: {},
    reducers: {
        ...productRawReducer
    }
})

export const {actions: productActions, reducer: productReducer} = productSlice

